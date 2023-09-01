# savage-electron-ipc

## Table of contents

### Functions

- [addToChannel](modules.md#addtochannel)
- [receive](modules.md#receive)
- [send](modules.md#send)

## Functions

### addToChannel

▸ **addToChannel**(`window`): `void`

add window to communication channel

**`Example`**

```typescript
import { app, BrowserWindow, Menu, ipcMain } from "electron";
import path from "path";
import ipc from "savage-electron-ipc";

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
      // This option needs to be enable, otherwise preload cannot access the node module
      nodeIntegration: true,
    },
  });

  // Add windows that need to communicate, this step is very important
  ipc.addToChannel(mainWindow);

  ipc
    .send<string>("msg", "hello")
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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `window` | `BrowserWindow` \| `BrowserWindow`[] | The window that needs to communicate |

#### Returns

`void`

___

### receive

▸ **receive**<`T`\>(`channel`, `listener`): `void`

render process receive message from main process

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel` | `string` | The name of the event. |
| `listener` | (`event`: `IpcMainInvokeEvent` \| `IpcRendererEvent`, `args`: `T`) => `any` | The callback function |

#### Returns

`void`

___

### send

▸ **send**<`T`\>(`channel`, `...args`): `Promise`<`T`\>

render process receive message from main process

**`Example`**

```typescript
ipc.receive("msg", (e, v) => {
  console.log(v); // 'hello'
  return "how dare you!";
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel` | `string` | The name of the event. |
| `...args` | `any`[] | What you want to send |

#### Returns

`Promise`<`T`\>
