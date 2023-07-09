const defaultTemplate = '你现在是一名优秀的少儿编程老师，目前所教的课程是{course}，主题是《{topic}》，{courseContent}。现在你要准备一个学生上课的评价。其中{stuComment}。这个评价要在{words}字左右，请你帮忙写出来'
import { IFormField } from './type'

const courseOptions = [
  { value: '玛塔', label: '玛塔' },
  { value: 'WeDo', label: 'WeDo' },
  { value: 'Scratch', label: 'Scratch' },
  { value: 'Python', label: 'Python' },
  { value: 'C++', label: 'C++' },
]

const formFields: Partial<IFormField>[] = [
  {
    label: '课程名：',
    name: 'course',
    type: 'select',
    options: courseOptions,
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

export {
  defaultTemplate,
  courseOptions,
  formFields,
}
