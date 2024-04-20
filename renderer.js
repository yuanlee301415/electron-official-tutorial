const $info = document.getElementById('info')
$info.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const $buildTime = document.getElementById('buildTime')
$buildTime.innerText = versions.buildTime;

console.log('versions:', window.versions)

ping()
setTitle()
openFile()
updateCounter()

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

function openFile() {
    document.getElementById('btn2').addEventListener('click', async () => {
        document.getElementById('filePath').innerText = await window.electronAPI.openFile()
    })
}

function updateCounter() {
    window.electronAPI.onUpdateCounter(value => {
        const $counter = document.getElementById('counter')
        const oldValue = Number($counter.innerText)
        const newValue = oldValue + value
        $counter.innerText = newValue
        window.electronAPI.counterValue(newValue)
    })
}
