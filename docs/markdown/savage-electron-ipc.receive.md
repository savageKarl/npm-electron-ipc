<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [savage-electron-ipc](./savage-electron-ipc.md) &gt; [receive](./savage-electron-ipc.receive.md)

## receive() function

render process receive message from main process

**Signature:**

```typescript
declare function receive<T = any[]>(channel: string, listener: (event: IpcMainInvokeEvent | IpcRendererEvent, args: T) => any): void;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  channel | string | The name of the event. |
|  listener | (event: IpcMainInvokeEvent \| IpcRendererEvent, args: T) =&gt; any | The callback function |

**Returns:**

void
