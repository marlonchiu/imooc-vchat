import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import 'dotenv/config'
import { CreateChatProps, UpdatedStreamData } from './types'
import { ChatCompletion } from '@baiducloud/qianfan'
import OpenAI from 'openai'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

let mainWindow: BrowserWindow
const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data)
    const { providerName, selectedModel, content, messageId } = data
    if (providerName === 'qianfan') {
      _triggerQianfan({ selectedModel, content, messageId })
    } else if (providerName === 'dashscope') {
      _triggerBailian({ selectedModel, content, messageId })
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

async function _triggerQianfan({
  selectedModel,
  content,
  messageId
}: {
  selectedModel: string
  content: string
  messageId: number
}) {
  const accessKey = process.env.QIANFAN_ACCESS_KEY
  const secretKey = process.env.QIANFAN_SECRET_KEY

  if (!accessKey || !secretKey) {
    console.error('❌ 环境变量未设置')
    return
  }

  const client = new ChatCompletion({
    QIANFAN_ACCESS_KEY: accessKey,
    QIANFAN_SECRET_KEY: secretKey,
    ENABLE_OAUTH: true
  })
  const stream = await client.chat(
    {
      messages: [{ role: 'user', content: content }],
      stream: true
    },
    selectedModel
  )
  for await (const chunk of stream as any) {
    const { is_end, result } = chunk
    const content: UpdatedStreamData = {
      messageId,
      data: {
        is_end,
        result
      }
    }

    mainWindow.webContents.send('update-message', content)
  }
}

async function _triggerBailian({
  selectedModel,
  content,
  messageId
}: {
  selectedModel: string
  content: string
  messageId: number
}) {
  const apiKey = process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    console.error('❌ 环境变量未设置')
    return
  }
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })

  const stream = await openai.chat.completions.create({
    // 开通赠送1,000,000 有效期半年
    // 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
    // 'qwen-turbo', 'qwen-flash'
    model: selectedModel,
    messages: [{ role: 'user', content: content }],
    stream: true
  })

  for await (const chunk of stream as any) {
    // 输出流式数据
    // console.log(chunk.choices[0])
    const { finish_reason, delta } = chunk.choices[0]
    const content: UpdatedStreamData = {
      messageId,
      data: {
        is_end: finish_reason === 'stop' ? true : false,
        result: delta.content
      }
    }

    mainWindow.webContents.send('update-message', content)
  }
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
