import { BrowserWindow, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

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
declare function addToChannel(window: BrowserWindow | BrowserWindow[]): void;
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
declare function send<T = any>(channel: string, ...args: any[]): Promise<T>;
/**
 * render process receive message from main process
 *
 * @public
 * @param channel - The name of the event.
 * @param listener - The callback function
 */
declare function receive<T = any[]>(channel: string, listener: (event: IpcMainInvokeEvent | IpcRendererEvent, args: T) => any): void;

export { addToChannel, receive, send };
