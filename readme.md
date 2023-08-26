# Electron-ipc

`Electron-ipc`是一个用于`election`不同进程之间通信的模块，它使得主进程到渲染进程，渲染进程到主进程和渲染进程到渲染进程的通信更加方便。

## 功能

> -   主进程到渲染进程的双向通信

-   渲染进程到主进程的双向通信
-   渲染进程到渲染进程的双向通信

## 使用

### 主进程与渲染进程通信

> main.ts (Main Process)

```typescript
import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import elIpc from "../../utils/electron-ipc";

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.ts"),
        },
    });
    elIpc
        .mainToRender<string>(win.webContents, "滴滴滴", "天王盖地虎")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    mainWindow.loadFile("index.html");
}
// ...
```

> preload.ts (Preload Script)

```typescript
import elIpc from "../../utils/electron-ipc";

elIpc.renderFromMain("滴滴滴", (e, arg) => {
    console.log(arg);
    return "宝塔镇河妖";
});
```

## api
