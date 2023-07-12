import rest from '@/utils/rest'
import { ISendMessageParams } from './type'

export const sendMessage = async(params: ISendMessageParams) => {
  const data = await rest.post<string>('/chat', params)
  return data
}
