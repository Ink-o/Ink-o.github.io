const defaultTemplate = `你现在是一名优秀的少儿编程老师，目前所教的课程是{course}，主题是《{topic}》，{courseContent}。现在你要准备一个学生上课的评价。其中{stuComment}。这个评价要在{words}字左右，请你帮忙写出来
请你模仿下面模板来完成这个评价：
《高拉背训练》
各位家长好，我是负责本次授课的陈老师，本次课的主题是wedo2课程《高拉背训练》

出勤的同学有： 邝之珩、冯梓乐、石中梁

学习内容：
① 了解运动器材和高拉背训练
② 运用连杆传动、多齿轮传动
③ 完成小人做高拉背训练的搭建
④ 程序模块：重复模块、判断模块、侦测模块、信息模块
⑤ 掌握使用键盘控制角色切换造型
⑥ 完成编程：当按下“↑键”，让舞台中的小人和搭建的机器人一起做高拉背训练；当按下“空格”，停止训练。

点评：
在本次课程中，之珩纪律性稍有不足，需要多次提醒才能集中注意力。梓乐和中梁积极性较高，搭建速度较快，观察相对细致。在编程方面，梓乐在今天有独立思考哦，能够独立自主地对程序进行理解、提出自己的疑问，并修正其中的问题，这一点非常值得鼓励。之珩和中梁同学对编程理解能力较强，能够理解并指出相关程序的信息模块和判断模块，在自主运用程序块上方面还需要多加练习。
`
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
    type: 'inputNumber',
    min: 1,
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
