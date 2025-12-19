// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge, webUtils } from 'electron'
import { CreateChatProps, OnUpdatedCallback } from './types'

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, data) => callback(data)),
  getFilePath: (file: File) => webUtils.getPathForFile(file),
  copyImageToUserDir: (sourcePath: string) => ipcRenderer.invoke('copy-image-to-user-dir', sourcePath)
})
