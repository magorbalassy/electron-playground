const electron = require('electron');
app = electron.app;
BrowserWindow = electron.BrowserWindow;

let mainWindow;

const express = require('express');
let server = express();
server.use(express.json());
let srv = server.listen(57000);


function createWindow () {
 mainWindow = new BrowserWindow({width: 800, height: 600})
 mainWindow.loadURL('file://'+__dirname+'/index.html')
 mainWindow.on('closed', function () {
  mainWindow = null
 })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
 if (process.platform !== 'darwin') {
  app.quit()
 }
})

app.on('activate', function () {
 if (mainWindow === null) {
  createWindow()
 }
})



const ipc = require('electron').ipcMain;
ipc.on('synMessage', (event, args) => {
 console.log(args);
 event.returnValue = 'Main said I received your Sync message';
})

ipc.on('aSynMessage', (event, args) => {
 console.log(args);
 event.sender.send('asynReply','Main said: Async message received')
})

//server.set('mainWindow', mainWindow);

server.post('/download', (req, res) => {
    //var config = req.app.get('config');
    console.log(req.body)
    mainWindow.webContents.send('your-event', req.body['1']);
    return res.send('GET HTTP method on user resource');
});