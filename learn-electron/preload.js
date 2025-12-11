const { contextBridge, ipcMain, ipcRenderer } = require('electron')
const fs = require('fs')
console.log('🚀 ~ fs:', fs)

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  electron: process.versions.electron,
  chrome: process.versions.chrome
})

contextBridge.exposeInMainWorld('electron', {
  // 单向通信
  setTitle: (title) => ipcRenderer.send('set-title', title),
  // 双向通信
  writeFile: (content) => ipcRenderer.invoke('write-file', content),
  onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  readFile: fs.promises.readFile
})

contextBridge.exposeInMainWorld('require', require)
