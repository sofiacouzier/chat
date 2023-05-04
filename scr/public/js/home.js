const socket = io()

const input = document.getElementById("textbox")
const logs = document.getElementById("logs")

input.addEventListener("keyup", evt => {
    let { key } = evt;
    if (key === "Enter") {
        socket.emit('message', input.value)
        input.value = ""
    }

})


socket.on('logs', data => {
    logs.innerHTML = data
})

console.log('hols')
