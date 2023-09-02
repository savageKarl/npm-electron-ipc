# Function: receive

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

#### Defined in

[index.ts:251](https://github.com/savage181855/npm-electron-ipc/blob/4a7af28/src/index.ts#L251)
