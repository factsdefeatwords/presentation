class LRUCache{
  constructor(capacity){
      this.capacity = capacity;
      this.cache = new Map();
  }

  get(key){
      if(!this.cache.has(key)) return -1;

      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
  }

  set(key, value){
      if(this.cache.has(key)){
          this.cache.delete(key);
      }else{
          if(this.cache.size === this.capacity){ 
              // 获取到Map中第一个数据的key值，即最近最少访问的key，删之
              const delKey = this.cache.keys().next().value;
              this.cache.delete(delKey);
          }
      }
      this.cache.set(key, value);
  }
}

//throttle
(function () {
  let canRun = true, timer = null
  return (delay, fn) => {
    if (!canRun) return
    canRun = false
    timer = setTimeout(() => {
      fn && fn()
      canRun = true
    }, delay);
  } 
})()
//debounce
(function () {
  let timer = null
  return (delay, fn) => {
    clearTimeout ( timer )
    timer = setTimeout(() => {
      fn && fn()
      canRun = true
    }, delay);
  } 
})()
//柯里化函数
const  curring = () => {
  // 在闭包中创建一个params集合用来预存储每次add执行所接收的实参
  let parmas = [];
  const add = (...args) => {
      parmas = parmas.concat(args)
      // 这里返回add 函数 因为我们不确定add函数执行完会调用多少次、每执行一次 接着返回一个add函数供其下次执行
      return add
  }
  // 将一个对象 转化为字符串或者数字 优先级[Symbol.toPrimitive] > valueOf >toString > Number
  // 基于重构转化为字符串的过程 实现求和操作
  add[Symbol.toPrimitive] = () => {
      // 将预先存储的 params 进行求和
      return parmas.reduce((result,item) => result + item)
  }
  return add
}

//compose 函数
const compose = (...fns) => x => fns.reduceRight(((result, item) => item(result)), x)

//两数之和
function add(nums, target) {
  let hash = {}
  for (let i = 0, len = nums.length; i < len; i++) {
    if (hash[ target - nums[i] ] !== undefined) {
      return [i, hash[ target - nums[i] ]].sort((a, b) => a - b)
    }

    hash[nums[i]] = i
  }

  return []
}

//排序(归并)
function mergeSort(arr){
  if (arr.length<2) { return arr; }
  var left=0;
  var right=arr.length-1;
  while(left<right){
    while(arr[right]>=arr[0] && left<right){
      right--;
    }
    while(arr[left]<=arr[0] && left<right){
      left++;
    }
    if (right==left) {
      var mid=arr[right];
      arr[right]=arr[0];
      arr[0]=mid;
      break;
    }
    var tem=arr[right];
    arr[right]=arr[left];
    arr[left]=tem;
  }
  //递归实现
  return mergeSort(arr.slice(0,left)).concat(arr.slice(left,right+1)).concat(mergeSort(arr.slice(right+1)));
}


function mergeSort(arr) {
  //console.time('MergeSort');
  //let count = 0;
  console.log(main(arr));
  //console.timeEnd('MergeSort');
  //return count;
  // 主函数。
  function main(arr) {
      // 记得添加判断，防止无穷递归导致callstack溢出，此外也是将数组进行分解的终止条件。
      if(arr.length === 1) return arr;
      // 从中间开始分解，并构造左边数组和右边数组。
      let mid = Math.floor(arr.length/2);
      let left = arr.slice(0, mid);
      let right = arr.slice(mid);
      // 开始递归调用。
      return merge(main(left), main(right));
  }
  // 数组的合并函数，left是左边的有序数组，right是右边的有序数组。
  function merge(left, right) {
      // il是左边数组的一个指针，rl是右边数组的一个指针。
      let il = 0,
          rl = 0,
          result = [];
      // 同时遍历左右两个数组，直到有一个指针超出范围。
      while(il < left.length && rl < right.length) {
          //count++;
          // 左边数组的当前项如果小于右边数组的当前项，那么将左边数组的当前项推入result，反之亦然，同时将推入过的指针右移。
          if(left[il] < right[rl]) {
              result.push(left[il++]);
          }
          else {
              result.push(right[rl++]);
          }
      }
      // 记得要将未读完的数组的多余部分读到result。
      return result.concat(left.slice(il)).concat(right.slice(rl));
  }
}


function mergeSort2 (arr) {
  return main ( arr )
  function main (arr) {
    if (arr.length <= 1 ) return arr
    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0,mid), right = arr.slice(mid)
    return merge(main(left), main(right)) 
  }

  function merge(left, right) {
    let result = [], il = 0, ir = 0
    while ( il < left.length && ir < right.length ) {
      left[il] < right[ir] ? result.push(left[il++]) : result.push(right[ir++])
    }
    return result.concat(left.slice(il)).concat(right.slice(ir))
  }
}

//快速排序
function quickSort(arr) {
  let left = 0,
      right = arr.length - 1;
  //console.time('QuickSort');
  main(arr, left, right);
  //console.timeEnd('QuickSort');
  return arr;
  function main(arr, left, right) {
      // 递归结束的条件，直到数组只包含一个元素。
      if(arr.length === 1) {
          // 由于是直接修改arr，所以不用返回值。
          return;
      }
      // 获取left指针，准备下一轮分解。
      let index = partition(arr, left, right);
      if(left < index - 1) {
          // 继续分解左边数组。
          main(arr, left, index - 1);
      }
      if(index < right) {
          // 分解右边数组。
          main(arr, index, right);
      }
  }
  // 数组分解函数。
  function partition(arr, left, right) {
      // 选取中间项为参考点。
      let pivot = arr[Math.floor((left + right) / 2)];
      // 循环直到left > right。
      while(left <= right) {
          // 持续右移左指针直到其值不小于pivot。
          while(arr[left] < pivot) {
              left++;
          }
          // 持续左移右指针直到其值不大于pivot。
          while(arr[right] > pivot) {
              right--;
          }
          // 此时左指针的值不小于pivot，右指针的值不大于pivot。
          // 如果left仍然不大于right。
          if(left <= right) {
              // 交换两者的值，使得不大于pivot的值在其左侧，不小于pivot的值在其右侧。
              [arr[left], arr[right]] = [arr[right], arr[left]];
              // 左指针右移，右指针左移准备开始下一轮，防止arr[left]和arr[right]都等于pivot然后导致死循环。
              left++;
              right--;
          }
      }
      // 返回左指针作为下一轮分解的依据。
      return left;
  }
}

function quickSort(array, left, right) {
  
  console.time('1.快速排序耗时');
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
      if (left < right) {
          var x = array[right], i = left - 1, temp;
          for (var j = left; j <= right; j++) {
              if (array[j] <= x) {
                  i++;
                  temp = array[i];
                  array[i] = array[j];
                  array[j] = temp;
              }
          }
          quickSort(array, left, i - 1);
          quickSort(array, i + 1, right);
      }
      console.timeEnd('1.快速排序耗时');
      return array;
  } else {
      return 'array is not an Array or left or right is not a number!';
  }
}

//方法二
var quickSort2 = function (arr) {
  console.time('2.快速排序耗时');
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  console.timeEnd('2.快速排序耗时');
  return quickSort2(left).concat([pivot], quickSort2(right));
};

//快速排序
function quickSort(arr) {
  // 当数组长度不大于1时，返回结果，防止callstack溢出。
  if(arr.length <= 1) return arr;
  return [
      // 递归调用quickSort，通过Array.prototype.filter方法过滤小于arr[0]的值，注意去掉了arr[0]以防止出现死循环。
      ...quickSort(arr.slice(1).filter(item => item < arr[0])),
      arr[0],
      ...quickSort(arr.slice(1).filter(item => item >= arr[0]))
  ];
}


//排序（冒泡）
function bubbleSort(arr){
	arr = arr || []
	for(var i=0,len=arr.length;i<len;i++){
		for(var j=i+1;j<len;j++){
			if(arr[i] > arr[j]){
				var temp = arr[i]
				arr[i] = arr[j]
				arr[j] = temp
			}
		}
	}
	return arr
}

function bubbleSort2 (arr) {
  let i = arr.length - 1
  while ( i > 0 ) {
    let pos = 0
    for ( let j = 0; j < i; j++ ) {
      if (arr[j] > arr[j+1]) {
        pos = j;
        [ arr[j], arr[j+1] ] = [ arr[j+1], arr[j] ]
      }
    }
    i = pos
  }
  return arr
}

//无重复最长子串 长度
function longestSubstring (s) {
  let hash = new Map(), max = 0, start = 0
  for ( let i = 0, len = s.length; i < len; i++ ) {
    hash.has(s[i]) && ( start = Math.max(hash.get(s[i]) + 1, start) )

    max = Math.max(max, i - start + 1)
    hash.set(s[i],i)
  }

  return max
}

//字符串最多出现的字符
function getStrMax(str){
	let obj = {},max = 0,maxName = ''
	for(let i=0,len=str.length;i<len;i++){
		obj[str[i]] ? obj[str[i]]++ : (obj[str[i]] = 1)
	}
	for(let k in obj){
		if(obj[k] > max){
			max = obj[k]
			maxName = k
		}
	}

	return {maxName,max}
}

//两数之和
function twonums(nums,target){
  let hash = {}

  for(let i=0; i < nums.length; i++) {
   if (hash[target - nums[i]] !== undefined) return [i, hash[target - nums[i]]]

    hash[nums[i]] = i
  }
  
}

//发布订阅
class PubSub {
  constructor() {
      // 维护事件及订阅行为
      this.events = {}
  }
  /**
   * 注册事件订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  subscribe(type, cb) {
      if (!this.events[type]) {
          this.events[type] = []
      }
      this.events[type].push(cb)
  }
  /**
   * 发布事件
   * @param {String} type 事件类型
   * @param  {...any} args 参数列表
   */
  publish(type, ...args) {
      if (this.events[type]) {
          this.events[type].forEach(cb => {
              cb(...args)
          })
      }
  }
  /**
   * 移除某个事件的一个订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  unsubscribe(type, cb) {
      if (this.events[type]) {
          const targetIndex = this.events[type].findIndex(item => item === cb)
          if (targetIndex !== -1) {
              this.events[type].splice(targetIndex, 1)
          }
          if (this.events[type].length === 0) {
              delete this.events[type]
          }
      }
  }
  /**
   * 移除某个事件的所有订阅行为
   * @param {String} type 事件类型
   */
  unsubscribeAll(type) {
      if (this.events[type]) {
          delete this.events[type]
      }
  }
}

class PubSub {
  constructor () {
    this.events = new Map()
  }

  subscribe (type, cb) {
    let cbs = this.events.get(type) || []
    this.events.set(type, [...cbs, cb] )
  }

  publish (type, ...args) {
    this.events.has(type) && this.events.get(type).forEach ( cb => {
      cb(...args)
    } )
  }

  unsubscribe (type, name) {
    if (this.events.has(type)) {
      let cbs = this.events.get(type)
      let index = cbs.findIndex(cb => cb.name === name)
      index > -1 && cbs.splice(index, 1)
      cbs.length > 0 ? this.events.set(type, cbs) : this.events.delete(type)
    }
  }

  unsubscribeAll (type) {
    this.events.has(type) && this.events.delete(type)
  }
}
var bus = new PubSub()

bus.subscribe('aaa', n => console.log(666 + n))
bus.publish('aaa', '123')
//观察者模式
class Observer {
  constructor (cb) {
    this.cb = cb
  }

  update() {
    this.cb()
    console.log('updated')
  }

}

//目标对象
class Object {
  constructor() {
    this.observers = []
  }

  add(observer) {
    this.observer.push(observer)
  }

  notify() {
    this.observers.forEach(ob => ob.update())
  }
}


function deepClone (parent) {
  
  const clone = parent => {
    let typeString = Object.prototype.toString.call(parent)
    if ( typeString !== '[object Object]' ) return parent

    let child

    if (parent[Symbol.iterator]) {
      child = [...parent]
    }

    if (typeString === '[object RegExp]') {
      child = RegExp(parent.source, parent.flags)
    }

    if (typeString === '[object Date]') {
      child = Date(parent.getTime())
    }

    let proto = Object.getPrototypeOf(parent)
    child = Object.setPrototypeOf(child, proto)

    for ( let k of Object.keys(parent) ) {
      child[k] = clone(parent[k])
    }
    return child
  }

  return clone(parent)
}