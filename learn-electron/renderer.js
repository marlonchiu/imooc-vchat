const info = document.getElementById('info')
info.innerHTML = `Chrome (${window.versions.chrome})，  Nodejs (${window.versions.node})，  Electron (${window.versions.electron})`

const titleInput = document.getElementById('title')
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  const title = titleInput.value
  window.electron.setTitle(title)
})
