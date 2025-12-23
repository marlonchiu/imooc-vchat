import { ChatMessageProps, UniversalChunkProps, TestConnectResult } from '../types'

export abstract class BaseProvider {
  abstract chat(messages: ChatMessageProps[], modelName: string): Promise<AsyncIterable<UniversalChunkProps>>
  abstract testConnection(): Promise<TestConnectResult>
  protected abstract transformResponse(chunk: any): UniversalChunkProps
}
