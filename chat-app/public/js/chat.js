const socket = io();
/**
 * above socket will allow us to send and recieve events from both server an client
 */
socket.on('sendMessage', (message) => {
    console.log(message);
});

document.querySelector("#message_form").addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message);
});

document.querySelector("#send_location").addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    })
})