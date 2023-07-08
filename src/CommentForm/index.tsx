import React from 'react'
import { Button, Form, Input, message, Tag, Space, Tooltip  } from 'antd'
import { Card } from 'antd'
import module from './index.module.scss'
import { SmileTwoTone } from '@ant-design/icons'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const defaultTemplate = '你现在是一名优秀的少儿编程老师，目前所教的课程是{course}，主题是《{topic}》，{courseContent}。现在你要准备一个学生上课的评价。其中{stuComment}。这个评价要在{words}字左右，请你帮忙写出来'

  const copyText = (text: string) => {
    return () => {
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
      messageApi.open({
        type: 'success',
        content: '复制成功',
      })
    }
  }
  const formFields = [
    {
      label: '课程名：',
      name: 'course',
      type: 'input',
    },
    {
      label: '课程主题：',
      name: 'courseTopic',
      type: 'textArea',
    },
    {
      label: '课程内容：',
      name: 'courseContent',
      type: 'textArea',
    },
    {
      label: '学生评价：',
      name: 'stuComment',
      type: 'textArea',
    },
    {
      label: '评价字数：',
      name: 'words',
      type: 'input',
    },
    {
      label: '生成文案：',
      name: 'genText',
      type: 'textArea',
      disabled: true,
    },
    {
      label: '目前模板：',
      name: 'template',
      type: 'textArea',
    },
  ]
  const TagsFileds = [
    {
      label: '{course}：课程名',
      clickCb: copyText('{course}'),
    },
    {
      label: '{topic}：课程主题',
      clickCb: copyText('{topic}'),
    },
    {
      label: '{courseContent}：课程内容',
      clickCb: copyText('{courseContent}'),
    },
    {
      label: '{stuComment}：学生评价',
      clickCb: copyText('{stuComment}'),
    },
    {
      label: '{words}：评价字数',
      clickCb: copyText('{words}'),
    },
  ]
  const initialValues = {
    words: '100',
    template: defaultTemplate,
  }
  const generateText = (formValue: Record<string, string>) => {
    const keys = [
      'course',
      'topic',
      'courseContent',
      'stuComment',
      'words',
    ]
    let text: string = formValue.template || ''
    keys.forEach(k => {
      const value = formValue[k] || ''
      text = text.replaceAll(`{${k}}`, value) as string
    })
    // 设置模板值
    form.setFieldValue('genText', text)
    messageApi.open({
      type: 'success',
      content: '生成成功',
    })
  }
  const copyGenText = () => {
    const text = form.getFieldValue('genText') as string
    copyText(text)()
  }
  const resetForm = () => {
    form.resetFields()
  }
  const resetTemplate = () => {
    form.setFieldValue('template', defaultTemplate)
  }
  return <>
    {contextHolder}
    <Card
      className={module.cardContainer}
      title={
        <>
          <span className={module.mr10}>阿go为阿宝添砖加瓦</span>
          <SmileTwoTone />
        </>
      }
    >
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
        autoComplete='off'
        onFinish={generateText}
      >
        {
          formFields?.map(({ label, name, type, disabled }) => {
            return <Form.Item
              label={label}
              name={name}
              key={name}
            >
              {
                type === 'input' ? <Input
                  disabled={disabled}
                /> : <Input.TextArea
                  rows={4}
                  disabled={disabled}
                />
              }
            </Form.Item>
          })
        }
        <Form.Item label='模块占位符'>
          <Space size={[0, 'small']} wrap>
            {
              TagsFileds?.map(({ label, clickCb }) => (
                <Tooltip placement='top' title='点击复制' key={label}>
                  <Tag
                    bordered={false}
                    color='processing'
                    onClick={clickCb}
                    className={module.cursorPointer}
                  >
                    {label}
                  </Tag>
                </Tooltip>
              ))
            }
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className={module.mr15} htmlType='submit' type='primary'>
            生成 prompt
          </Button>
          <Button className={module.mr15} onClick={copyGenText}>
            复制 prompt
          </Button>
          <Button className={module.mr15} danger onClick={resetTemplate}>
            重置模板
          </Button>
          <Button className={module.mr15} danger onClick={resetForm}>
            重置表单
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </>
}

export default App
