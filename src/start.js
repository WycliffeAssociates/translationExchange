const electron = require('electron')
const { app, BrowserWindow, protocol } = electron

const path = require('path')
const url = require('url')

const buildDir = "build";

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1024, height: 768 })

  mainWindow.webContents.setUserAgent(
    mainWindow.webContents.getUserAgent() + " TranslationExchangeClient"
  );
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "..", buildDir, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
  )

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

//app.on('ready', createWindow)
app.on('ready', () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const { pathname } = url.parse(request.url);
    let relPath = pathname.split(buildDir).pop();

	  // Fix relative path in Windows Os, by removing drive letter
    if(process.platform == "win32") {
		  relPath = relPath.replace(/^\/[A-Z]{1}:/, "");
	  }
	
	  const absPath = path.normalize(path.join(__dirname, "..", buildDir, relPath));
  
    callback({ path: absPath})
  }, (error) => {
    if (error) console.error('Failed to register protocol')
  })
  createWindow()
})

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