import OpenAI from 'openai'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps, UniversalChunkProps, ModelItem } from '../types'
import { convertMessages } from '../helper'

export class OpenAIProvider extends BaseProvider {
  private client: OpenAI
  constructor(apiKey: string, baseURL: string) {
    super()
    this.client = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL
    })
  }

  async chat(messages: ChatMessageProps[], model: string) {
    const convertedMessages = await convertMessages(messages)
    const stream = await this.client.chat.completions.create({
      model,
      messages: convertedMessages as any,
      stream: true
    })

    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResponse(chunk)
        }
      }
    }
  }

  protected transformResponse(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): UniversalChunkProps {
    const choice = chunk.choices[0]
    return {
      is_end: choice.finish_reason === 'stop',
      result: choice.delta.content || ''
    }
  }

  /**
   * 测试OpenAI兼容API的连通性
   * 通过调用models接口来验证API key和base URL是否正确
   */
  async testConnection(): Promise<{ success: boolean; message: string; models: ModelItem[] }> {
    try {
      // 尝试获取模型列表来测试连通性
      const models = await this.client.models.list()
      if (models.data && models.data.length > 0) {
        console.log('==testConnection', models.data)
        return {
          success: true,
          models: models.data,
          message: `连接成功！找到 ${models.data.length} 个可用模型`
        }
      }
      return {
        success: false,
        models: [],
        message: '连接成功但未找到可用模型'
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
