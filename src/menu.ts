import { app, Menu, BrowserWindow } from 'electron'

/**
 * 创建应用菜单
 * @param mainWindow 主窗口实例，用于发送 IPC 事件
 */
const createMenu = (mainWindow: BrowserWindow) => {
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    // 文件菜单（包含新建对话）
    {
      label: app.name,
      submenu: [
        {
          label: '新建对话',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // 发送新建对话事件到渲染进程
            mainWindow.webContents.send('menu-new-conversation')
          }
        },
        {
          label: '设置',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // 发送打开设置事件到渲染进程
            mainWindow.webContents.send('menu-open-settings')
          }
        },
        { type: 'separator' },
        {
          role: 'quit'
        }
      ]
    },
    { role: 'editMenu' as const },
    { role: 'viewMenu' as const },
    ...(process.platform === 'darwin'
      ? [
          {
            role: 'windowMenu' as const
          }
        ]
      : [])
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

export { createMenu }
