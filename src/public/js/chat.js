const socket = io();

let user = null;

if(!user) {
    Swal.fire({
      title: "Bienvenido al chat!",
      input: "Ingresá tu e-mail:",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Es necesario que ingrese su e-mail";
        }
      }
    }).then((input) => {
        user = input.value;
        socket.emit('newUser', user);
    })
}

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', ()=>{
    socket.emit('chat:message', {
        user,
        message: message.value
    })
    message.value = '';
    console.log(message)
})

socket.on('messages', (data)=>{
    actions.innerHTML = ''
    const chatRender = data.map((msg)=>{
        return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`
    }).join(' ')

    output.innerHTML = chatRender
})

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', user)
})

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p>${data} está escribiendo...</p>`
})