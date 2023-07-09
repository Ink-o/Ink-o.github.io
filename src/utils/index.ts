const joinClassName = (classNames: string[]) => {
  return classNames.join(' ')
}
const copy = (text: string) => {
  // 创建一个隐藏的文本输入框
  const textInput = document.createElement('input')

  // 设置要复制的文本内容
  textInput.value = text

  // 将文本输入框添加到页面中
  document.body.appendChild(textInput)

  // 选择文本输入框的内容
  textInput.select()
  textInput.setSelectionRange(0, 99999)  // 兼容移动设备

  // 执行复制命令
  document.execCommand('copy')

  // 移除文本输入框
  document.body.removeChild(textInput)
}

export {
  joinClassName,
  copy,
}
