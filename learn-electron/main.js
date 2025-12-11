const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
  return win
}

// function createSecondWindow (parent) {
//   const win = new BrowserWindow({
//     width: 600,
//     height: 300,
//     parent: parent
//   })

//   win.loadFile('second.html')
// }

function handleSetTitle(event, title) {
  console.log('handleSetTitle ~ event:', event)
  const win = BrowserWindow.fromWebContents(event.sender)
  win.setTitle(title)
}
async function handleWriteFile(event, content) {
  console.log('the content:', content)
  await fs.promises.writeFile('test.txt', content)
  const stats = await fs.promises.stat('test.txt')
  return stats.size
}

app.whenReady().then(() => {
  let counter = 1
  const win = createWindow()
  win.webContents.send('update-counter', counter)
  setInterval(() => {
    counter += 3
    win.webContents.send('update-counter', counter)
  }, 3000)
  // const parent = createWindow()
  // createSecondWindow(parent)

  ipcMain.on('set-title', handleSetTitle)
  ipcMain.handle('write-file', handleWriteFile)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
