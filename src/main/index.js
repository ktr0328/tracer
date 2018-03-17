'use strict'

import { app, screen, BrowserWindow } from 'electron'

/**
* Set `__static` path to static files in production
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
*/
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

app.commandLine.appendSwitch('disable-renderer-backgrounding')
let mainWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

function createWindow () {
  /**
  * Initial window options
  */
  mainWindow = new BrowserWindow({
    useContentSize: true,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    show: false
  })
  mainWindow.maximize()
  mainWindow.setIgnoreMouseEvents(true)
  mainWindow.loadURL(winURL)
  mainWindow.showInactive()

  setInterval(() => {
    const mouse = screen.getCursorScreenPoint()
    mainWindow.webContents.send('mouse', { x: mouse.x, y: mouse.y })
  }, 300)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
* Auto Updater
*
* Uncomment the following code below and install `electron-updater` to
* support auto updating. Code Signing with a valid certificate is required.
* https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
*/

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
