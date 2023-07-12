import { message } from 'antd'
import { IToastType } from './type'

const toast = (msg: string, type:IToastType = 'success', duration = 3, onClose?: () => void) => {
  message[type](msg, duration, onClose)
}

export default toast
