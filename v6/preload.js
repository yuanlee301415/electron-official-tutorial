const { contextBridge, ipcRenderer } = require('electron')

/**
 * 自 Electron 12 以来，默认情况下已启用上下文隔离，并且它是 所有应用程序推荐的安全设置。
 */
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    // 除函数之外，我们也可以暴露变量
    buildTime: new Date().toISOString()
})


contextBridge.exposeInMainWorld('electronAPI', {
    // 渲染进程调用主进程
    setTitle: (title) => ipcRenderer.send('set-title', title),

    /**
     * ipcRenderer.invoke API 是在 Electron 7 中添加的，作为处理渲染器进程中双向 IPC 的一种开发人员友好的方式
     */
    openFile: () => ipcRenderer.invoke('dialog:openFile')
})


/**
 * 使用 ipcRenderer.send
 * 我们用于单向通信的 ipcRenderer.send API 也可用于双向通信。 这是在 Electron 7 之前通过 IPC 进行异步双向通信的推荐方式。
 * */
ipcRenderer.on('async-reply', (event, arg) => {
    console.log('async-reply>arg:', arg) // 在 DevTools 控制台中打印 "Hi"
})
ipcRenderer.send('async-message', 'hello')

