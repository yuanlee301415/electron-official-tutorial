const $info = document.getElementById('info')
$info.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const $buildTime = document.getElementById('buildTime')
$buildTime.innerText = versions.buildTime;

console.log('versions:', window.versions)

ping()
setTitle()

async function ping() {
    const response = await window.versions.ping()
    console.log('response:', response)
}

function setTitle() {
    const $btn = document.getElementById('btn')
    const $title = document.getElementById('title')
    $btn.addEventListener('click', () => {
        window.electronAPI.setTitle($title.value)
    })
}
