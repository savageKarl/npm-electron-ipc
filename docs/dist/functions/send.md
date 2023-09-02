# Function: send

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

#### Defined in

[index.ts:233](https://github.com/savage181855/npm-electron-ipc/blob/4a7af28/src/index.ts#L233)
