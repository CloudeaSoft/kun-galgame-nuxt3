import { KunLanguage } from '~/types/i18n'

export interface Balance {
  bid: number
  reason: KunLanguage
  type: string
  time: number
  amount: number
  status: number

  created: Date
  updated: Date
}
