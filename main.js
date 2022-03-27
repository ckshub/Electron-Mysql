// index.js
// 引入添加ipcMain(通信主进程)
const { app, BrowserWindow,ipcMain } = require('electron')
// 引入mysql工具类
const conn = require('./electron/utils/sql');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      // 在vue里面要引入electron里面的内容需要用到这俩
      nodeIntegration:true,
      contextIsolation: false
    }
  })
  win.webContents.openDevTools()
  win.loadURL("http://localhost:3000")
}
app.whenReady().then(() => {
  createWindow()
})
// 添加一个进程时间监听，监听来自send的事件
ipcMain.on('send',(event, arg) => {
  console.log('connect mysql sql:',arg)  // prints "sql"
  // 接收一个args 此处args是一条sql语句
  conn.query(arg,(qerr,vals,fields)=>{
   // 通过conn.query进行查询，查询结果是vals
   // 发起消息回调事件，发起reply，将vals传递回去
    event.sender.send('reply', vals);
  })
});