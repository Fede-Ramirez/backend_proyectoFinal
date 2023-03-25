const chat = document.querySelector('#messagesForm');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const messageBox = document.querySelector('#messageContainer');

const socket = io();

chat.addEventListener('submit', (e) =>{
    e.preventDefault()

    let newMessage = {
        email: email.value,
        message: message.value
    }

    socket.emit('newMessage', newMessage)

    email.value= ''
    message.value = ''
})

const addNewMessage = (data) =>{

    const lastMessage = data.pop();

    const messageContainer = document.createElement('div');
    const messageEmail = document.createElement('p');
    const messageTime = document.createElement('p');
    const messageText = document.createElement('p');

    messageEmail.innerText = lastMessage.email;
    messageText.innerText = lastMessage.message;
    messageTime.innerText = lastMessage.createdAt;

    //messageEmail.appendChild(messageTime);
    messageContainer.appendChild(messageTime);
    messageContainer.appendChild(messageEmail);
    messageContainer.appendChild(messageText);

    messageBox.appendChild(messageContainer);
};

socket.on('renderMessage', (data) =>{
    addNewMessage(data);
});