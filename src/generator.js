// 可迭代对象
let range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    for (let current = this.from; current <= this.to; current++) {
      yield current
    }
  }
}
let asyncRange = {
  from: 1,
  to: 5,
  async *[Symbol.asyncIterator]() {
    for (let current = this.from; current <= this.to; current++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      yield current
    }
  }
}

const arr = 'abc'
const run = async () => {
  for await (const item of asyncRange) {
    console.log('item', item)
  }
}

run()

function* generateSequence() {
  yield 1
  yield 2
  return 3
}

let generator = generateSequence()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
const run2 = () => {
  for (const item of generator) {
    console.log('item', item)
  }
}
// run2()
