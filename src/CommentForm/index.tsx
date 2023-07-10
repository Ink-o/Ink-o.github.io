import React from 'react'
import { Button, Form, Input, message, Tag, Space, Tooltip, Select, InputNumber } from 'antd'
import { Card } from 'antd'
import module from './index.module.scss'
import { SmileTwoTone } from '@ant-design/icons'
import { joinClassName, copy } from '@/utils'
import { IFormField } from './type'
import { defaultTemplate, formFields } from './constent'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const copyText = (text: string) => {
    return () => {
      copy(text)
      messageApi.open({
        type: 'success',
        content: '复制成功',
      })
    }
  }
  const TagsFileds = [
    {
      label: '{course}：课程名',
      clickCb: copyText('{course}'),
    },
    {
      label: '{courseTopic}：课程主题',
      clickCb: copyText('{courseTopic}'),
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
      'courseTopic',
      'courseContent',
      'stuComment',
      'words',
    ]
    let text: string = formValue.template || ''
    keys.forEach(k => {
      const value = formValue[k] || ''
      text = text.replaceAll(`{${k}}`, value)
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
  const showCom = (
    { type, disabled, options, min, max }: Partial<IFormField>,
  ) => {
    switch (type) {
      case 'input':
        return <Input
          disabled={disabled}
          allowClear
        />
      case 'textArea':
        return <Input.TextArea
          rows={4}
          disabled={disabled}
          allowClear
        />
      case 'inputNumber':
        return <InputNumber
          className={module.w100}
          disabled={disabled}
          min={min}
          max={max}
        />
      case 'select':
        return <Select allowClear showSearch disabled={disabled} options={options} />
    }
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
          formFields?.map((item) => {
            const {
              label,
              name,
            } = item
            return <Form.Item
              label={label}
              name={name}
              key={name}
            >
              {
                showCom(item)
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
        <div className={module.btnContainer}>
          <Button className={joinClassName([module.mr15, module.mb10])} htmlType='submit' type='primary'>
            生成 prompt
          </Button>
          <Button className={joinClassName([module.mr15, module.mb10])} onClick={copyGenText}>
            复制 prompt
          </Button>
          <Button className={joinClassName([module.mr15, module.mb10])} danger onClick={resetTemplate}>
            重置模板
          </Button>
          <Button className={joinClassName([module.mr15, module.mb10])} danger onClick={resetForm}>
            重置表单
          </Button>
        </div>
      </Form>
    </Card>
  </>
}

export default App
