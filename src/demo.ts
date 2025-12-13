import { ChatCompletion } from '@baiducloud/qianfan'
import 'dotenv/config'
import OpenAI from 'openai'
// import fs from 'fs/promises'
import fs from 'fs'

// 测试百度千帆
// await testQianfan()

// 测试阿里百炼
// await testBailian()

// 测试千问VL 图文理解
// await testQwenVL()

// 测试千问长文本上下文
// await testQwenLong()

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

async function testQwenVL() {
  const apiKey = process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    console.error('❌ 环境变量未设置')
    return
  }
  const openai = new OpenAI({
    // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
    apiKey: apiKey,
    // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为：https://dashscope-intl.aliyuncs.com/compatible-mode/v1
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })

  const imageBuffer = await fs.readFile('D:/github_projects/imooc-vchat/src/assets/dog_and_girl.jpeg')
  const base64Image = imageBuffer.toString('base64')
  // console.log("🚀 ~ testQwenVL ~ base64Image:", base64Image)

  const completion = await openai.chat.completions.create({
    // 开通赠送1,000,000 有效期1个月
    // 此处以qwen3-vl-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/models
    model: 'qwen3-vl-plus',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: '图中是什么品种的狗，请用英文回答' },
          // { type: 'text', text: '图中描绘的是什么景象?' },
          // 需要注意，传入Base64，图像格式（即image/{format}）需要与支持的图片列表中的Content Type保持一致。
          // PNG图像：  data:image/png;base64,${base64Image}
          // JPEG图像： data:image/jpeg;base64,${base64Image}
          // WEBP图像： data:image/webp;base64,${base64Image}
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      }
    ]
  })
  // console.log(JSON.stringify(completion))
  console.log(completion.choices[0].message.content)
}

async function testQwenLong() {
  const apiKey = process.env.DASHSCOPE_API_KEY

  if (!apiKey) {
    console.error('❌ 环境变量未设置')
    return
  }
  const client = new OpenAI({
    // 若没有配置环境变量，请用百炼API Key将下行替换为：apiKey: "sk-xxx",
    apiKey: apiKey,
    // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为：https://dashscope-intl.aliyuncs.com/compatible-mode/v1
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })

  const fileObj = await client.files.create({
    file: fs.createReadStream('D:/github_projects/imooc-vchat/src/assets/1.pdf'),
    purpose: 'file-extract' as any
  })

  const resp = await client.chat.completions.create({
    model: 'qwen-long',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'system', content: `fileid://${fileObj.id}` },
      { role: 'user', content: '请帮忙概括文件讲述了什么' }
    ]
    // stream: true
  })
  console.log(resp.choices[0].message)
}
