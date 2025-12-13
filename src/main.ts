import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import started from 'electron-squirrel-startup'
import { ChatCompletion } from '@baiducloud/qianfan'
import 'dotenv/config'
import OpenAI from 'openai'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit()
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
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

  // 测试百度千帆
  // await testQianfan()

  // 测试阿里百炼
  await testBailian()
}

async function testQianfan() {
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
      messages: [
        { role: 'user', content: '你好' }

        // { role: 'user', content: '光合作用' }

        // { role: 'user', content: '你好' },
        // { role: 'assistant', content: '如果您有任何问题，请随时向我提问。' },
        // { role: 'user', content: '我在上海，周末可以去哪里玩？' },
        // { role: 'assistant', content: '上海是一个充满活力和文化氛围的城市，有很多适合周末游玩的地方。' },
        // { role: 'user', content: '周末这里的天气怎么样？' }
      ],
      stream: true
    },
    'ERNIE-Speed-128K'
  )
  for await (const chunk of stream as any) {
    console.log(chunk)
  }
}

async function testBailian() {
  const apiKey = process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    console.error('❌ 环境变量未设置')
    return
  }
  const openai = new OpenAI({
    // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
    apiKey: apiKey,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })

  const resp = await openai.chat.completions.create({
    // 开通赠送1,000,000 有效期半年
    // 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
    // 'qwen-turbo', 'qwen-flash'
    model: 'qwen-plus',
    messages: [
      // { role: 'system', content: 'You are a helpful assistant.' },
      // { role: 'user', content: '你是谁？' }

      // { role: 'system', content: '你现在是一个六岁的小孩，请模仿儿童可爱的口吻进行回答' },
      // { role: 'user', content: '什么是光合作用？' }

      { role: 'system', content: '你现在是一只卡通片里面的可爱小狗，请模仿汪汪队长的口吻进行回答' },
      { role: 'user', content: '请问队长，老鼠为什么有害呢?' }
    ]
    // stream: true
  })
  console.log(JSON.stringify(resp))
  console.log('resp', resp.choices[0].message)

  // 流式输出
  // for await (const chunk of resp as any) {
  //   // 输出流式数据
  //   console.log(chunk.choices[0].delta)
  // }
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
