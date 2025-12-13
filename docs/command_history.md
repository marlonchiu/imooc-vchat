## 历史操作命令

**6-1 使用 Electron Forge 初始化项目**

```bash
## 使用 Electron Forge 初始化项目
npx create-electron-app@latest vchat --template=vite-typescript
```

**6-2 添加 vue3 支持**

```bash
npm install vue@latest
npm install --save-dev @vitejs/plugin-vue@5.2.4 # 不要使用6.0.0 无法启动项目
```

**6-3 介绍和安装 Tailwind.css**

```bash
# 安装 tailwindcss V3
npm install -D tailwindcss@3 postcss@latest autoprefixer@latest
npx tailwindcss init -p

#或者安装 tailwindcss V4(异常)
npm install tailwindcss @tailwindcss/vite
```

**6-6 使用 Iconify 作为图标解决方案**

```bash
npm install --save-dev @iconify/vue
```

**6-7 安装和初次认识 Radix Vue**

```bash
npm install radix-vue
```

**7-1 安装并且使用 Vue Router**

```bash
npm install vue-router@4
```

**8-2 初步使用文心一言调用 SDK**

```bash
npm install @baiducloud/qianfan
```

**8-4 学习使用阿里通义千问：了解 OpenAI SDK 的使用**

```bash
npm install openai dotenv
```

**9-2 学习 Dexie.js 的基本用法**

```bash
npm install dexie
```

**9-4 完成对话和信息的创建 第二部分**

```bash
npm install dayjs
```
