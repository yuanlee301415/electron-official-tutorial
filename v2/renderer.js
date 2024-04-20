const $info = document.getElementById('info')
$info.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const $buildTime = document.getElementById('buildTime')
$buildTime.innerText = versions.buildTime;
