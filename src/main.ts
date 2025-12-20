import { app, BrowserWindow, ipcMain, protocol, net } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import 'dotenv/config'
import { CreateChatProps } from './types'
import fs from 'fs/promises'
import url from 'url'
import util from 'util'
import { createProvider } from './providers/createProvider'
import { configManager } from './config'
import { createMenu, updateMenu } from './menu'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

// 注册特权协议，可以绕过内容安全策略。处理 windows 系统拦截 protocol 自定义协议无效问题
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'safe-file', //自定义协议名称 safe-file://
    privileges: {
      // 赋予这个协议的权限
      standard: true, // 允许像标准协议一样使用
      secure: true, // 启用安全上下文（类似 HTTPS）
      supportFetchAPI: true // 允许在渲染进程中使用 fetch API 访问此协议
    }
  }
])

let mainWindow: BrowserWindow
const createWindow = async () => {
  // 初始化配置
  const config = await configManager.load()
  console.log('config:', util.inspect(config, { depth: null, colors: true }))

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 创建应用菜单
  createMenu(mainWindow)

  // 创建一个协议
  protocol.handle('safe-file', async (request) => {
    // const filePath = decodeURIComponent(request.url.slice('safe-file://'.length))
    // const newFilePath = url.pathToFileURL(filePath).toString()
    // return net.fetch(newFilePath)

    const userDataPath = app.getPath('userData')
    const imageDir = path.join(userDataPath, 'images')
    // 去除协议头 safe-file://，解码 URL 中的路径
    const filePath = path.join(decodeURIComponent(request.url.slice('safe-file:/'.length)))
    const filename = path.basename(filePath)
    const userFilePath = path.join(imageDir, filename)
    // 转换为 file:// URL
    const newFilePath = url.pathToFileURL(userFilePath).toString()
    // 使用 net.fetch 加载本地文件
    return await net.fetch(newFilePath)
  })

  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData')
    const imagesDir = path.join(userDataPath, 'images')
    await fs.mkdir(imagesDir, { recursive: true })
    const fileName = path.basename(sourcePath)
    const destPath = path.join(imagesDir, fileName)
    await fs.copyFile(sourcePath, destPath)
    return destPath
  })

  // 读取应用配置
  ipcMain.handle('get-config', async () => {
    return configManager.get()
  })

  // 保存应用配置
  ipcMain.handle('update-config', async (event, newConfig) => {
    const updatedConfig = await configManager.update(newConfig)
    // 如果语言发生变化，更新菜单
    if (newConfig.language && mainWindow && !mainWindow.isDestroyed()) {
      updateMenu(mainWindow)
    }
    return updatedConfig
  })

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data)
    const { providerName, selectedModel, messages, messageId } = data
    try {
      const provider = createProvider(providerName)
      const stream = await provider.chat(messages, selectedModel)
      for await (const chunk of stream) {
        const content = {
          messageId,
          data: chunk
        }
        mainWindow.webContents.send('update-message', content)
      }
    } catch (error) {
      const errorContent = {
        messageId,
        data: {
          is_end: true,
          result: error instanceof Error ? error.message : '与AI服务通信时发生错误',
          is_error: true
        }
      }
      mainWindow.webContents.send('update-message', errorContent)
    }
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
