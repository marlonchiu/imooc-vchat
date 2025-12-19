import { ProviderProps, ConversationProps, MessageProps } from './types'

// 大模型选框
export const providers: ProviderProps[] = [
  {
    id: 1,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-Speed-8K', 'ERNIE-lite-8K', 'ERNIE-Speed-128K'],
    // avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    avatar: 'https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png',
    createdAt: '2025-07-14',
    updatedAt: '2025-07-14'
  },
  {
    id: 2,
    name: 'dashscope',
    title: '阿里百炼',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-vl-plus'],
    // avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    avatar: 'https://img.alicdn.com/imgextra/i4/O1CN01Slt9qq1Q0CmLAG9MK_!!6000000001913-55-tps-32-32.svg',
    createdAt: '2025-07-14',
    updatedAt: '2025-07-14'
  },
  {
    id: 3,
    name: 'deepseek',
    title: 'DeepSeek',
    desc: '深度求索',
    // https://api-docs.deepseek.com/zh-cn/
    models: ['deepseek-chat', 'deepseek-reasoner'],
    avatar: 'https://cdn.deepseek.com/platform/favicon.png',
    createdAt: '2025-12-01',
    updatedAt: '2025-12-01'
  },
  {
    id: 4,
    name: 'gptfree',
    title: 'GPT-free',
    desc: 'GPT-API-free / DeepSeek-API-free',
    // https://github.com/chatanywhere/GPT_API_free
    models: ['deepseek-v3', 'gpt-5-mini'],
    avatar: 'https://github.com/chatanywhere/GPT_API_free/raw/main/images/logo.png',
    createdAt: '2025-12-19',
    updatedAt: '2025-12-19'
  }
]

// 历史对话列表
export const conversations: ConversationProps[] = [
  {
    id: 1,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用1',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  },
  {
    id: 2,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  },
  {
    id: 3,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  },
  {
    id: 4,
    selectedModel: 'GPT-3.5-Turbo',
    title: '什么是光合作用, 你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    providerId: 1
  }
]

export const messages: MessageProps[] = [
  {
    id: 1,
    content: '什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 1
  },
  {
    id: 2,
    content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 1
  },
  {
    id: 3,
    content: '请告诉我更多',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 1
  },
  {
    id: 4,
    content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 1
  },
  {
    id: 5,
    content: '还有更多的信息吗',
    createdAt: '2024-07-03',
    type: 'question',
    updatedAt: '2024-07-03',
    conversationId: 1
  },
  {
    id: 6,
    content: '',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'loading',
    conversationId: 1
  },
  {
    id: 7,
    content: '2什么是光合作用',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 2
  },
  {
    id: 8,
    content: '2你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 2
  },
  {
    id: 9,
    content: '2请告诉我更多',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'question',
    conversationId: 2
  },
  {
    id: 10,
    content: '2你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    conversationId: 2
  },
  {
    id: 11,
    content: '3还有更多的信息吗',
    createdAt: '2024-07-03',
    type: 'question',
    updatedAt: '2024-07-03',
    conversationId: 3
  },
  {
    id: 12,
    content: '',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03',
    type: 'answer',
    status: 'loading',
    conversationId: 3
  }
]
