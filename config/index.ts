import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const APP_INFO: AppInfo = {
  title: '命理教育',
  description: '命理教育是一项个性化的命理分析服务，通过用户提供的出生年月日时，计算出其生辰八字并进行详细的命理分析。服务内容涵盖命主资料、人生总论、事业、财运、姻缘、健康、六亲和五十年大运总论等多个方面。每次对话提供详细且易懂的分析和建议，帮助用户了解自身命运趋势，并提供风水摆设和水晶推介，助力用户在生活中取得更好发展。',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans',
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
