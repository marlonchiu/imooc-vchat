enum Direction1 {
  Up = 6,
  Down,
  Left,
  Right
}
console.log(Direction1.Up) // 0
console.log(Direction1[0]) //'Up'

enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const value1 = 'UP'
if (value1 === Direction2.Up) {
  console.log('go up!')
}

// 常量枚举
const enum Direction3 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}
const value2 = 'UP'
if (value2 === Direction3.Up) {
  console.log('go up!')
}
