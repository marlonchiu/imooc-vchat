// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge, webUtils } from 'electron'
import { CreateChatProps, OnUpdatedCallback, AppConfig, ProviderName, TestConnectResult } from './types'

// 通过 contextBridge 仅暴露必要的 API，避免直接暴露 ipcRenderer，并转发 IPC 通信到主进程
contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, data) => callback(data)),
  getFilePath: (file: File) => webUtils.getPathForFile(file),
  copyImageToUserDir: (sourcePath: string) => ipcRenderer.invoke('copy-image-to-user-dir', sourcePath),
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (config: Partial<AppConfig>) => ipcRenderer.invoke('update-config', config),
  onMenuNewConversation: (callback: () => void) => ipcRenderer.on('menu-new-conversation', () => callback()),
  onMenuOpenSettings: (callback: () => void) => ipcRenderer.on('menu-open-settings', () => callback()),
  showContextMenu: (id: number) => ipcRenderer.send('show-context-menu', id),
  onDeleteConversation: (callback: (id: number) => void) =>
    ipcRenderer.on('delete-conversation', (_event, id) => callback(id)),
  testProviderConnect: (providerName: ProviderName): Promise<TestConnectResult> =>
    ipcRenderer.invoke('test-provider-connect', providerName)
})

// IPC 模式：

// 单向通知：send/on
// 双向调用：invoke/handle
// 事件推送：webContents.send + ipcRenderer.on
