import {
	ipcMain,
	ipcRenderer,
	IpcRendererEvent,
	IpcMainInvokeEvent,
	BrowserWindow
} from 'electron'

/** render process send message to main process  */
const renderToMain = <T = any>(channel: string, args: any[]) => {
	return ipcRenderer.invoke(channel, args) as Promise<T>
}

/** main process receive message from render process  */
const mainFromRender = <T = any[]>(
	channel: string,
	listener: (event: IpcMainInvokeEvent, args: T) => any
) => {
	return ipcMain.handle(channel, listener)
}

/** main process send message to render process  */
const mainToRender = <T = any[]>(channel: string, args: any[]) => {
	windowList.forEach(w => w.webContents.send(channel, args))
	return new Promise<T>((resolve, reject) => {
		ipcMain.on('bi-directional', (e, args) => {
			resolve(args)
		})
	})
}

/** render process receive message from main process  */
const renderFromMain = <T = any[]>(
	channel: string,
	listener: (event: IpcRendererEvent, args: T) => void
) => {
	ipcRenderer.on(channel, (e, args) => {
		ipcRenderer.send('bi-directional', listener(e, args))
	})
}

// use to have the main process send message to render process
const windowList: BrowserWindow[] = []

function isBrowserWindow(v: unknown): v is BrowserWindow {
	return Object.prototype.toString.call(v) === '[object Object]'
}

function isBrowserWindowArray(v: unknown): v is BrowserWindow[] {
	return Object.prototype.toString.call(v) === '[object Array]'
}

/** add window to communication channel */
const addToChannel = (v: BrowserWindow | BrowserWindow[]) => {
	if (isBrowserWindow(v)) windowList.push(v)
	if (isBrowserWindowArray(v)) windowList.push(...v)
}

const send = <T = any>(channel: string, ...args: any[]) => {
	let p = new Promise<T>(() => {})

	if (ipcMain) p = mainToRender(channel, args)
	if (ipcRenderer) {
		p = renderToMain(channel, args)
		renderToMain('forward', [channel, args])
	}
	return p
}

const receive = <T = any[]>(
	channel: string,
	listener: (event: IpcMainInvokeEvent | IpcRendererEvent, args: T) => any
) => {
	if (ipcMain) mainFromRender(channel, listener)
	if (ipcRenderer) renderFromMain(channel, listener)
}

// proxy forward message from render process to render process
receive<[string, any]>('forward', (e, args) => mainToRender(args[0], args[1]))

export default {
	addToChannel,
	send,
	receive
}
