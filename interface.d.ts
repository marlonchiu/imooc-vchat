import { CreateChatProps, OnUpdatedCallback, AppConfig } from './src/types'

// 声明 Electron 主进程暴露给渲染进程的 API 方法及其 类型，确保参数和返回值类型正确安全
export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void
  // 监听消息流式更新
  onUpdateMessage: (callback: OnUpdatedCallback) => any
  getFilePath: (file: File) => string
  // 将图片复制到用户目录，返回新路径
  copyImageToUserDir: (sourcePath: string) => Promise<string>
  getConfig: () => Promise<AppConfig>
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig>
  onMenuNewConversation: (callback: () => void) => void
  onMenuOpenSettings: (callback: () => void) => void
  // 显示指定ID的对话项的上下文菜单
  showContextMenu: (id: number) => Promise<void>
  onDeleteConversation: (callback: (id: number) => void) => void
}


// 扩展全局 Window 类型，将 electronAPI 注入到 window 对象，使得在渲染进程中可以直接访问 electronAPI
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
