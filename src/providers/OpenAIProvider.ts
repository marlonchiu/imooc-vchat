import OpenAI from 'openai'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps } from '../types'

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
    const stream = await this.client.chat.completions.create({
      model,
      messages: messages as any,
      stream: true
    })
    return stream
  }
}
