const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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

app.whenReady().then(() => {
  createWindow()
  // const parent = createWindow()
  // createSecondWindow(parent)

  ipcMain.on('set-title', handleSetTitle)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
