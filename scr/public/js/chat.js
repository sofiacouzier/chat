const socket = io({
    autoConnect: false
});
const chatbox = document.getElementById('chatbox');

let user;
Swal.fire({
    title: "Identifícate",
    text: "Para acceder al chat, coloca tu username",
    icon: "question",
    input: "text",
    inputValidator: (value) => {
        return !value && '¡Necesitas identificarte antes de entrar!'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    console.log(user)
    socket.connect()
    socket.emit('authenticated', user)
})

chatbox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatbox.value.trim().length > 0) {
            socket.emit('mensages', { user, message: chatbox.value.trim() })
        }
    }
})


socket.on("logs", data => {
    const logs = document.getElementById('logs');
    console.log(data)
    let mens = ''
    data.forEach(log => {
        mens += `${log.user} dice ${log.message} <br/>`
    });
    logs.innerHTML = mens
})

socket.on("newUserConnected", data => {
    if (!user) return;
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        title: `${data} se unio al chat`
    })
})