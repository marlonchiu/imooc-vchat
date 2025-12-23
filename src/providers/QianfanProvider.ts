import { ChatCompletion } from '@baiducloud/qianfan'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps, UniversalChunkProps, BaiduChunkProps } from '../types'

export class QianfanProvider extends BaseProvider {
  private client: any
  constructor(accessKey: string, secretKey: string) {
    super()
    this.client = new ChatCompletion({
      QIANFAN_ACCESS_KEY: accessKey,
      QIANFAN_SECRET_KEY: secretKey,
      ENABLE_OAUTH: true
    })
  }

  async chat(messages: ChatMessageProps[], model: string) {
    const stream = await this.client.chat(
      {
        messages,
        stream: true
      },
      model
    )
    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResponse(chunk)
        }
      }
    }
  }

  protected transformResponse(chunk: BaiduChunkProps): UniversalChunkProps {
    return {
      is_end: chunk.is_end,
      result: chunk.result
    }
  }

  /**
   * 测试百度千帆API的连通性
   * 发送一个简单的测试消息来验证access key和secret key是否正确
   */
  async testConnection(): Promise<{ success: boolean; message: string; models: [] }> {
    try {
      // 发送一个简单的测试消息
      const testMessages = [{ role: 'user', content: '你好' }]
      const stream = (await this.client.chat(
        {
          messages: testMessages as any,
          stream: false // 使用非流式请求进行测试
        },
        'ERNIE-Speed-128K'
      )) as any
      if (stream && stream.result) {
        console.log('==testConnection-qianfan', stream.result)
        return {
          success: true,
          models: [],
          message: '连接成功！API配置正确'
        }
      }
      return {
        success: false,
        models: [],
        message: '连接失败：响应格式异常'
      }
    } catch (error: any) {
      return {
        success: false,
        models: [],
        message: `连接失败：${error.message || '未知错误'}`
      }
    }
  }
}
