import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 从配置中获取语言设置
type MessageSchema = typeof zh
type LanguageType = 'zh' | 'en'

// 初始化 i18n 实例
export const i18n = createI18n<[MessageSchema], LanguageType>({
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

// 初始化i18n的语言设置
export async function initI18n() {
  const config = await window.electronAPI.getConfig()
  setI18nLanguage(config.language)
}

// 设置语言的函数
export function setI18nLanguage(locale: LanguageType) {
  i18n.global.locale.value = locale
}
