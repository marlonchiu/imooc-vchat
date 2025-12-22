import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAIProvider } from './OpenAIProvider'
// import 'dotenv/config'
import { configManager } from '../config'

export function createProvider(providerName: string): BaseProvider {
  const config = configManager.get()
  const providerConfig = config.providerConfigs[providerName]

  switch (providerName) {
    case 'qianfan':
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
      }
      return new QianfanProvider(providerConfig.apiKey, providerConfig.secretKey)
    case 'dashscope':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少通义千问API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    case 'deepseek':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    case 'gptfree':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少GPT Free API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
// export function createProvider(providerName: string): BaseProvider {
//   switch (providerName) {
//     case 'qianfan':
//       return new QianfanProvider(
//         process.env['QIANFAN_ACCESS_KEY'] as string,
//         process.env['QIANFAN_SECRET_KEY'] as string
//       )
//     case 'dashscope':
//       return new OpenAIProvider(
//         process.env['DASHSCOPE_API_KEY'] as string,
//         'https://dashscope.aliyuncs.com/compatible-mode/v1'
//       )
//     case 'deepseek':
//       return new OpenAIProvider(process.env['DEEPSEEK_API_KEY'] as string, 'https://api.deepseek.com/v1')
//     case 'gptfree':
//       return new OpenAIProvider(process.env['GPT_FREE_API_KEY'] as string, 'https://api.chatanywhere.tech/v1')
//     default:
//       throw new Error(`Unsupported provider: ${providerName}`)
//   }
// }
