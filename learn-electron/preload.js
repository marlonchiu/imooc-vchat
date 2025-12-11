const { contextBridge, ipcMain, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  electron: process.versions.electron,
  chrome: process.versions.chrome
})

contextBridge.exposeInMainWorld('electron', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})
