import { BrowserWindow, IpcMainInvokeEvent, IpcRendererEvent } from 'electron';

/**
 * add window to communication channel
 * @public
 *
 * @param window - The window that needs to communicate
 */
declare function addToChannel(window: BrowserWindow | BrowserWindow[]): void;
/**
 * render process receive message from main process
 * @public
 *
 * @param channel - The name of the event.
 * @param args - What you want to send
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
/**
 * @beta
 * @returns 'fuckyou'
 */
declare function say(): string;
declare const _default: {
    addToChannel: typeof addToChannel;
    send: typeof send;
    receive: typeof receive;
};

export { addToChannel, _default as default, receive, say, send };
