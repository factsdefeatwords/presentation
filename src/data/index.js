/**
 * 根据组件类型选择对应类型数据结构
 */

 const data = {
  type1: {
    en: {
      start: 'Not likely',
      end: 'Very likely',
      placeholder: 'Please be brutal and direct : )',
      submit: 'Submit',
      step1: {
        title: 'On a scale of 1-10, how likely are you to recommend our website to someone you know？'
      },
      step2: {
        title: 'We would like to know about the things that influence your experience?',
        selections: [
          'In-depth information',
          'Support more languages',
          'Faster Customer support',
          'Intuitive on-page experience',
          'There are no recommended people'
        ]
      },
      step3: {
        title: 'What can we do to improve your experience and your score?'
      },
      next: 'Confirm',
      ending1: 'Thank You！ ',
      ending2: 'Your feedback will help us to improve.'
    }
  }
}

export default data