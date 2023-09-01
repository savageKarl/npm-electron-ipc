import { ipcMain, ipcRenderer } from 'electron';

/** render process send message to main process  */
const renderToMain = (channel, args) => {
    return ipcRenderer.invoke(channel, args);
};
/** main process receive message from render process  */
const mainFromRender = (channel, listener) => {
    return ipcMain.handle(channel, listener);
};
/** main process send message to render process  */
const mainToRender = (channel, args) => {
    windowList.forEach(w => w.webContents.send(channel, args));
    return new Promise(resolve => {
        ipcMain.on('bi-directional', (e, args) => {
            resolve(args);
        });
    });
};
/**
 * render process receive message from main process
 * @param channel - The name of the event.
 * @param listener - The callback function
 */
const renderFromMain = (channel, listener) => {
    ipcRenderer.on(channel, (e, args) => {
        ipcRenderer.send('bi-directional', listener(e, args));
    });
};
// use to have the main process send message to render process
const windowList = [];
function isBrowserWindow(v) {
    return Object.prototype.toString.call(v) === '[object Object]';
}
function isBrowserWindowArray(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
}
/**
 * add window to communication channel
 * @public
 *
 * @param window - The window that needs to communicate
 *
 * @example
 *
 * ```typescript
 * import { app, BrowserWindow, Menu, ipcMain } from "electron";
 * import path from "path";
 * import ipc from "savage-electron-ipc";
 *
 * function createWindow() {
 *   const mainWindow = new BrowserWindow({
 *     webPreferences: {
 *       preload: path.join(__dirname, "preload.ts"),
 *       // This option needs to be enable, otherwise preload cannot access the node module
 *       nodeIntegration: true,
 *     },
 *   });
 *
 *   // Add windows that need to communicate, this step is very important
 *   ipc.addToChannel(mainWindow);
 *
 *   ipc
 *     .send<string>("msg", "hello")
 *     .then((res) => {
 *       console.log(res);
 *     })
 *     .catch((err) => {
 *       console.log(err);
 *     });
 *   mainWindow.loadFile("index.html");
 * }
 * // ...
 * ```
 *
 */
function addToChannel(window) {
    if (isBrowserWindow(window))
        windowList.push(window);
    if (isBrowserWindowArray(window))
        windowList.push(...window);
}
/**
 * render process receive message from main process
 * @public
 *
 * @param channel - The name of the event.
 * @param args - What you want to send
 *
 * @example
 *
 * ```typescript
 * ipc.receive("msg", (e, v) => {
 *   console.log(v); // 'hello'
 *   return "how dare you!";
 * });
 * ```
 */
function send(channel, ...args) {
    let p = new Promise(() => null);
    if (ipcMain)
        p = mainToRender(channel, args);
    if (ipcRenderer) {
        p = renderToMain(channel, args);
        renderToMain('forward', [channel, args]);
    }
    return p;
}
/**
 * render process receive message from main process
 *
 * @public
 * @param channel - The name of the event.
 * @param listener - The callback function
 */
function receive(channel, listener) {
    if (ipcMain)
        mainFromRender(channel, listener);
    if (ipcRenderer)
        renderFromMain(channel, listener);
}
// proxy forward message from render process to render process
receive('forward', (e, args) => mainToRender(args[0], args[1]));

export { addToChannel, receive, send };
//# sourceMappingURL=index.mjs.map
