import { defineComponent, ref, withModifiers,h } from 'vue'


/*
  vue3 jsx 写法核心依赖插件
  babel-loader  版本7.0以上
  @babel/core   版本7.0以上
  @vue/babel-plugin-jsx  
*/

const AnchoredHeading = defineComponent({
  props: {
    level: {
      type: Number,
      default: () => 1
    },
    text: {
      type: String,
      default: () => ''
    }
  },
  render() {
    return h(
      'h' + this.level,
      {},
      h(
        'u',
        {
          title: this.text
        },
        this.$slots.default()
      )
    )
  },
})

const App = defineComponent({
  setup() {
    const count = ref(100)

    const inc = () => {
      count.value++
    }

    return () => (
      <div onClick={withModifiers(inc, ['self'])}>
        {count.value}
        {[1,2,3,4,5,6].map(i => <AnchoredHeading level={i} text={`这是h${i}标签`}> 第{ i }个插槽 </AnchoredHeading>)}
      </div>
    )
  }
})

export default App