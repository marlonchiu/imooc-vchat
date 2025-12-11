const fs = window.require('fs')

const info = document.getElementById('info')
info.innerHTML = `Chrome (${window.versions.chrome})，  Nodejs (${window.versions.node})，  Electron (${window.versions.electron})`

const titleInput = document.getElementById('title')
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  const title = titleInput.value
  window.electron.setTitle(title)
})

const contentInput = document.getElementById('content')
const btn2 = document.getElementById('btn2')
btn2.addEventListener('click', async () => {
  const content = contentInput.value
  const len = await window.electron.writeFile(content)
  console.log('🚀 ~ btn2.addEventListener ~ len:', len)
  info.innerHTML = `File Size: ${len} 个字符`

  // const c = await window.electron.readFile('test.txt', { encoding: 'utf-8' })
  const c = await fs.promises.readFile('test.txt', { encoding: 'utf-8' })
  info.innerHTML += `;File Content: ${c}`
})

const counter = document.getElementById('counter')
window.electron.onUpdateCounter((value) => {
  counter.innerHTML = value.toString()
})
