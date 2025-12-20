## cursor 历史命令

**12-3 使用Cursor 完成配置文件的后端开发的功能**

```bash
1. 根据目前的代码，我想给应用添加应用配置文件，请给我列出对应的解决方案，要简单直观，不要太复杂，目前的配置不需要添加太复杂，只要保留两个当前语言，字体大小
2. 不要 IndexedDB 的存储方式，而是使用文件系统进行保存
3. 简洁为主，ConfigManager 没必要使用面向对象的方式，直接使用单个对象也是一个好的解决方式。
```

**12-4 完善设置页面- 生成对应的表单以及更新功能**

```bash
1. 请给我在 Setting.vue 中生成对应的界面，和目前的config 结合起来，现在仅需要两个 Input ，一个切换对应的语言，使用 radix-vue 当中的 Select，一个用来设置字体的大小，使用 radix-vue 当中的 number-field
2. 不需要保存按钮，应该是实时的进行修改
```

**12-5 使用 Cursor Composer 开发国际化功能**

```bash
1. 我现在要给应用添加国际化，我会使用 vue-i18n，请写出对应的解决方案，特别注意我已经添加了对应的应用配置，其中有国际化的配置，请在Settings.vue 更新对应字段的时候进行实时的更新。
```

**12-6 使用 Cursor 的读图功能完成模型界面的第一部分开发**

```bash
1. 在 Settings 中调整，实现如图中这样的一个 Tab，点击以后获取所有模型，并且实现类似的手风琴效果，表单内容还不需要实现，只需要先填充几个因定的表单即可
```

**12-7 使用 Cursor Composer 分步实现动态表单的功能**

```javascript
// 1. 我要在应用中实现设置每个 Provider 的时候实现动态表单的功能，也就是每个 Provider 在 Settings 中的设置的参数表单是不同的，所以每个Provider 的设置表单需要动态渲染，更倾向于简单的实现方式，不要过度设计，我这里要多步完成这个功能，第一步:设计一个provider 和配置参数的对应关系，可以参考如下代码

interface ProviderConfigItem {
  key: string;
  value: any;
}

// 百度文心一言配置
export const qianfanConfig: ProviderConfigItem[] = [
  {
    key: 'secretKey',
    value: '',

  }
]
export const providerConfigs: Record<string, ProviderConfigItem[]> = {
  qianfan: qianfanConfig
}

// 第二步:在 Settings 中界面进行展示，应该添加到第二个 Tab 的内容中，注意 provider 和我们 providerConfigs 中的对应关系。参考文件：Settings.vue / testData.ts

// 第三步:实现数据的持久化 我们已经实现了应用的配置，看起来沿用已有的方案就是不错的选择
`providerConfig gianfan:{accessKey:'1234', secretKey:'xcvcv'}}`

// 第三步:实现数据的持久化，你可以在表单中添加保存按钮，也可以在bur的时候自动保存，注意设计持久化位置，可选方案有文件/数据库，请进行对比,如果选用文件，请特别注意在 main 中已经写好的 config 读取保存,你可以对它进行简单扩展
```

**12-9 使用 AI 创建应用菜单 第一部分**

```bash
1. 请给我的应用添加菜单，目前应该只有两个个性化的选项，一个是新建对话，一个是设置，其他可以保持默认的菜单组，比如Edit和 View，请不要再原来的 main.ts 上面添加，而是要新建一个文件完成,个性化选项只发射事件，先不需要再渲染进程添加任何逻辑，之后再添加这个功能
2. 已经有这种类型的快捷键 CmdOrCtrl+N 是否可以替代三元表达式
```

**12-10 使用 AI 完成顶部菜单功能 第二部分**

```bash
1. 下面请将菜单的逻辑补充完整，和渲染进程进行通信完成对应的功能，注意请使用 vue-router 完成对应的跳转
2. 现在请添加菜单国际化逻辑，菜单应该根据应用语言来设置，请注意现在的解决方案使用的是 vue-i18n，应用设置采用 configManager 的方式
3. editMenu 、 viewMenu 、windowMenu 是否也可以实现对应的国际化
```
