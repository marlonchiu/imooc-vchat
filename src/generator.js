let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from
    return {
      next: () => {
        // {done: Boolean, value: any}，
        if (current <= this.to) {
          return { value: current++, done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}

const arr = 'abc'
const run = () => {
  for (const item of range) {
    console.log('item', item)
  }
}

run()
