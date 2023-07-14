const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io()

socket.on('connect', () => {
  // console.log('connected')
  lblOffline.style.display = 'none'
  lblOnline.style.display = ''
})

socket.on('disconnect', () => {
  // console.log('disconnected')
  lblOnline.style.display = 'none'
  lblOffline.style.display = ''
})

socket.on('send-message', (payload) => {
  console.log(payload)
})

btnEnviar.addEventListener('click', () => {
    const message = txtMensaje.value
    const payload = {
        message,
        id: '123',
        date: new Date().getTime()
    }
    socket.emit('send-message', payload, (id) => {
      console.log('From server', id)
    })
})