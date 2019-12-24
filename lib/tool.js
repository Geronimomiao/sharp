// 柯里化
const curry = (fn) => {
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)))
      }
    }
    return fn.apply(null, args)
  }
};

// 偏应用
const partial = (fn, ...partialArgs) => {
  return function (...fillAgrs) {
    let arg = 0;
    for (let i = 0; i < partialArgs.length && arg < fillAgrs.length; i++) {
      if(partialArgs[i] === undefined) {
        partialArgs[i] = fillAgrs[arg++]
      }
    }
    return fn.apply(null, partialArgs)
  }
};

// 组合函数
const reduce = (array, fn, initialValue) => {
  let acc = initialValue ? initialValue : array[0];
  if (initialValue !== undefined) {
    for (let value of array) {
      acc = fn(acc, value)
    }
  } else {
    for (let i = 1; i < array.length; i++) {
      acc = fn(acc, array[i])
    }
  }
  return [acc]
};

const compose = (...fns) =>
  (value) => reduce(fns.reverse(), (acc, fn) => fn(acc), value);

// 管道函数
const pipe = (...fns) =>
  (value) => reduce(fns, (acc, fn) => fn(acc), value);

// const compose = (...fns) =>
//   (value) => fns.reverse().reduce((acc, fn) => fn(acc), value)

// 调试函数
const identity = (it) => {
  console.log(it);
  return it
};

// 仅执行一次
const once = (fn) => {
  let done = false;
  return function () {
    return done ? undefined : (done=true, fn.apply(null, arguments))
  }
};

// 缓存
const memoized = (fn) => {
  const lookupTable = {};
  // 此处返回值 用的精妙 可参考例1运行结果
  return (...args) => {lookupTable[args.join('')] || (lookupTable[args.join('')]=fn(...args))};
};

// 将多参函数改为仅接受第一个参数
const unary = (fn) =>
  (arg) => fn(arg);

// console.log(['1', '2', '3'].map(unary(parseInt)))
// 函子
const Container = function (val) {
  this.value = val
};

Container.of = function (val) {
  return new Container(val)
};

Container.prototype.map = function (fn) {
  return Container.of(fn(this.value))
};
