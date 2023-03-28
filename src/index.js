const firebaseConfig = {
    apiKey: "AIzaSyA5q0YoohkYVTDFRDudeEtVXCS8FEkjXmM",
    authDomain: "simple-chat-3b73f.firebaseapp.com",
    projectId: "simple-chat-3b73f",
    storageBucket: "simple-chat-3b73f.appspot.com",
    messagingSenderId: "737557155450",
    appId: "1:737557155450:web:1483caaf81aff4a8e575c3"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//get username
const username = prompt("Informe seu usúario");

// document.getElementById("menssage_dig").scrollIntoView(false);

//press enter for to send
document.getElementById("menssage_dig").addEventListener('keyup', (e) => {
  const key = e.which || e.keyCode;

  if (key == 13) {
    sendMessage();
  }
})

function sendMessage() {
    let message = document.getElementById('menssage_dig').value;

    if (message.trim() == '') return;
    
    firebase.database().ref("chat/" + Date.now()).set({
        username,
        message,
      });

    //clear message
    document.getElementById("menssage_dig").value = '';

    setTimeout(() => {
      goToLastMessage();
    }, 100);
}

function goToLastMessage(){
  let message_list = document.getElementById("chat").childNodes;
  
  if (message_list.length < 1) return;

  document.getElementById("chat").lastChild.scrollIntoView(true);  
}


const fetchChat = firebase.database().ref("chat/");

fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val(),
          message_layout = `<div class= ${username === messages.username ? "sent" : "receive"} id="teste_message">
                                <span>${username === messages.username ? "You": messages.username} </span>
                                <p>${messages.message}</p>
                            </div>`;

    //Append message to chat
    document.getElementById("chat").innerHTML += message_layout;
});
