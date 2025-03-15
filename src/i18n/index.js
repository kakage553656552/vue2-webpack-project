import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  },
  ja: {
    ...jaLocale
  }
}

// 获取浏览器语言设置
const getBrowserLanguage = () => {
  const language = navigator.language || navigator.userLanguage
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh' // 默认使用中文
}

// 创建 VueI18n 实例
const i18n = new VueI18n({
  locale: localStorage.getItem('language') || getBrowserLanguage(),
  messages,
  silentTranslationWarn: true
})

export default i18n 