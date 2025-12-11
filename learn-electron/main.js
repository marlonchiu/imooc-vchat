const { app, BrowserWindow } = require('electron')
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

app.whenReady().then(() => {
  const parent = createWindow()
  // createSecondWindow(parent)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
