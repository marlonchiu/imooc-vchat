import { app, Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron'
import { configManager } from './config'
import zh from './i18n/locales/zh'
import en from './i18n/locales/en'

type MessageSchema = typeof zh
const messages: Record<string, MessageSchema> = {
  en,
  zh
}

// 创建一个通用的翻译函数
const createTranslator = () => {
  const config = configManager.get()
  return (key: string) => {
    const keys = key.split('.')
    let result: any = messages[config.language]
    for (const k of keys) {
      result = result[k]
    }
    return result as string
  }
}
/**
 * 创建应用菜单
 * @param mainWindow 主窗口实例，用于发送 IPC 事件
 * @param language 语言设置，默认为 'zh'
 */
const createMenu = (mainWindow: BrowserWindow) => {
  const t = createTranslator()

  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    // 文件菜单（包含新建对话）
    {
      label: app.name,
      submenu: [
        {
          label: t('menu.app.newConversation'),
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // 发送新建对话事件到渲染进程
            mainWindow.webContents.send('menu-new-conversation')
          }
        },
        {
          label: t('menu.app.settings'),
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // 发送打开设置事件到渲染进程
            mainWindow.webContents.send('menu-open-settings')
          }
        },
        { type: 'separator' },
        {
          role: 'quit',
          label: t('menu.app.quit')
        }
      ]
    },
    // 编辑菜单
    {
      label: t('menu.edit.title'),
      submenu: [
        {
          role: 'undo',
          label: t('menu.edit.undo')
        },
        {
          role: 'redo',
          label: t('menu.edit.redo')
        },
        { type: 'separator' },
        {
          role: 'cut',
          label: t('menu.edit.cut')
        },
        {
          role: 'copy',
          label: t('menu.edit.copy')
        },
        {
          role: 'paste',
          label: t('menu.edit.paste')
        },
        {
          role: 'selectAll',
          label: t('menu.edit.selectAll')
        },
        ...(process.platform === 'darwin'
          ? ([
              { type: 'separator' as const },
              {
                label: t('menu.edit.speech.title'),
                submenu: [
                  {
                    role: 'startSpeaking',
                    label: t('menu.edit.speech.startSpeaking')
                  },
                  {
                    role: 'stopSpeaking',
                    label: t('menu.edit.speech.stopSpeaking')
                  }
                ]
              },
              {
                role: 'emoji',
                label: t('menu.edit.emoji')
              }
            ] as MenuItemConstructorOptions[])
          : [])
      ]
    },
    {
      label: t('menu.view.title'),
      submenu: [
        {
          role: 'reload',
          label: t('menu.view.reload')
        },
        {
          role: 'forceReload',
          label: t('menu.view.forceReload')
        },
        {
          role: 'toggleDevTools',
          label: t('menu.view.toggleDevTools')
        },
        { type: 'separator' },
        {
          role: 'resetZoom',
          label: t('menu.view.resetZoom')
        },
        {
          role: 'zoomIn',
          label: t('menu.view.zoomIn')
        },
        {
          role: 'zoomOut',
          label: t('menu.view.zoomOut')
        },
        { type: 'separator' },
        {
          role: 'togglefullscreen',
          label: t('menu.view.togglefullscreen')
        }
      ]
    },
    // 窗口菜单（仅 macOS）
    ...(process.platform === 'darwin'
      ? [
          {
            label: t('menu.window.title'),
            submenu: [
              {
                role: 'minimize' as const,
                label: t('menu.window.minimize')
              },
              {
                role: 'close' as const,
                label: t('menu.window.close')
              },
              {
                role: 'front' as const,
                label: t('menu.window.front')
              }
            ]
          }
        ]
      : [])
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

const createContextMenu = (win: BrowserWindow, id: number) => {
  const t = createTranslator()
  const template = [
    {
      label: t('contextMenu.deleteConversation'),
      click: () => {
        win.webContents.send('delete-conversation', id)
      }
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup({ window: win })
}

// 导出一个更新菜单的函数，在语言改变时调用
const updateMenu = (mainWindow: BrowserWindow) => {
  createMenu(mainWindow)
}

export { createMenu, updateMenu, createContextMenu }
