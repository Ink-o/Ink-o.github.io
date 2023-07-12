import React, { Fragment, useState } from 'react'
import {
  Button, Form, Input, Tag, Space, Tooltip, Select, InputNumber, Spin,
} from 'antd'
import { Card } from 'antd'
import module from './index.module.scss'
import { SmileTwoTone } from '@ant-design/icons'
import { joinClassName, copy } from '@/utils'
import { IFormField } from './type'
import { defaultTemplate, formFields } from './constent'
import { sendMessage } from './service'
import { isValidCode } from '@/utils/rest'
import toast from '@/utils/toast'

const App: React.FC = () => {
  const [form] = Form.useForm()
  const [generating, useGenerating] = useState(false)
  const [costTime, useCostTime] = useState(0)

  const copyText = (text: string) => {
    return () => {
      copy(text)
      // messageApi.open({
      //   type: 'success',
      //   content: '复制成功',
      // })
      toast('复制成功')
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
  const generatePrompt = (formValue: Record<string, string>, needTips = true) => {
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
    form.setFieldValue('genPrompt', text)
    // needTips && messageApi.open({
    //   type: 'success',
    //   content: '生成 Prompt 成功',
    // })
    needTips && toast('生成 Prompt 成功')
    return text
  }
  const copyTextFieldText = (key: string) => {
    const text = form.getFieldValue(key) as string
    return copyText(text)
  }
  const resetForm = () => {
    form.resetFields()
  }
  // 设置表单值
  const setFieldValue = (k: string, v: any) => {
    form.setFieldValue(k, v)
  }
  const resetTemplate = () => {
    setFieldValue('template', defaultTemplate)
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
  const generateComment = async() => {
    useGenerating(true)
    // messageApi.open({
    //   type: 'success',
    //   content: '正在生成评价，请稍后',
    // })
    toast('正在生成评价，请稍候')
    // costTime
    const beforeTime = Date.now()
    const formItems = form.getFieldsValue() as Record<string, any>
    const question = generatePrompt(formItems, false)
    const { data, code } = await sendMessage({
      question,
    })
    const afterTime = Date.now()
    if (!isValidCode(code)) {
      // messageApi.open({
      //   type: 'error',
      //   content: '接口请求错误',
      // })
      toast('接口请求错误', 'error')
      useGenerating(false)
      return
    }
    // messageApi.open({
    //   type: 'success',
    //   content: '生成成功！',
    // })
    toast('生成成功！')
    setFieldValue('genContent', data)
    useGenerating(false)
    useCostTime(afterTime - beforeTime)
  }

  return <>
    {/* {contextHolder} */}
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
        onFinish={generatePrompt}
      >
        {
          formFields?.map((item) => {
            const {
              label,
              name,
              timeShow,
            } = item
            return <Fragment key={name}>
              <Form.Item
                label={label}
                name={name}
              >
                {
                  showCom(item)
                }
              </Form.Item>
              {
                (timeShow && costTime) ? <Form.Item
                  label='本次生成用时：'
                >
                  <div>
                    <span style={{ 'color': 'red' }}>{costTime}ms</span>
                  </div>
                </Form.Item> : null
              }
            </Fragment>
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
          <Spin spinning={generating} size='small'>
            <Button className={joinClassName([module.mr15, module.mb10])} type='primary' onClick={generateComment}>
              生成评价
            </Button>
          </Spin>
          <Button className={joinClassName([module.mr15, module.mb10])} htmlType='submit' type='primary'>
            生成 prompt
          </Button>
          <Button className={joinClassName([module.mr15, module.mb10])} onClick={copyTextFieldText('genPrompt')}>
            复制 prompt
          </Button>
          <Button className={joinClassName([module.mr15, module.mb10])} onClick={copyTextFieldText('genContent')}>
            复制评价
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
