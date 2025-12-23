import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs/promises'
import path from 'path'
import { CreateChatProps, ProviderName } from './types'
import { createProvider } from './providers/createProvider'
import { configManager } from './config'
import { updateMenu, createContextMenu } from './menu'

export function setupIPC(mainWindow: BrowserWindow) {
  // context menu handler
  ipcMain.on('show-context-menu', (event, id) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    createContextMenu(win, id)
  })

  // chat handler
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data)
    const { providerName, selectedModel, messages, messageId } = data
    try {
      const provider = createProvider(providerName)
      const stream = await provider.chat(messages, selectedModel)
      for await (const chunk of stream) {
        console.log('the chunk', chunk)
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

  // Config handlers
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

  // File handling
  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData')
    const imagesDir = path.join(userDataPath, 'images')
    await fs.mkdir(imagesDir, { recursive: true })
    const fileName = path.basename(sourcePath)
    const destPath = path.join(imagesDir, fileName)
    await fs.copyFile(sourcePath, destPath)
    return destPath
  })

  // provider连通性测试
  ipcMain.handle('test-provider-connect', async (event, providerName: ProviderName) => {
    try {
      const provider = await createProvider(providerName)
      const result = await provider.testConnection()
      return result
    } catch (error: any) {
      return {
        success: false,
        message: `创建provider失败：${error.message}`
      }
    }
  })
}
