const { contextBridge, ipcMain, ipcRenderer } = require('electron')
const { writeFile } = require('original-fs')

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  electron: process.versions.electron,
  chrome: process.versions.chrome
})

contextBridge.exposeInMainWorld('electron', {
  // 单向通信
  setTitle: (title) => ipcRenderer.send('set-title', title),
  // 双向通信
  writeFile: (content) => ipcRenderer.invoke('write-file', content)
})
