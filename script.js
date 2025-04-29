let chatBox = document.getElementById("chatBox");
let input = document.getElementById("userInput");
let typeNotifier = document.getElementById("typeNotifier");
let responseTimes = [3000, 2000, 4000];
function loadChatHistory() {
    let savedChat = localStorage.getItem("chatHistory");
    if (savedChat) {
        chatBox.innerHTML = savedChat;
    }
}
function saveChatHistory() {
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}
function clearChat() {
    chatBox.innerHTML = "";
    localStorage.removeItem("chatHistory");
}
function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}
function grabTime() {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes().toString().padStart(2, "0");
    let type = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${type}`;
}
input.addEventListener("keyup", function(event) {
    if (input.value.trim() === "") return;
    let message = input.value.trim();
    let newMessageBox = document.createElement("div");
    newMessageBox.classList.add("container");
    newMessageBox.innerHTML = `<img src="user.png" alt="Avatar">
    <p>${message}</p>
    <span class="time-right">${grabTime()}</span>`;
    if (event.keyCode === 13) {
        event.preventDefault();
        input.value = "";
        chatBox.appendChild(newMessageBox);
        saveChatHistory();
        let response;
        message = message.toLowerCase();
        if (message.includes("hello") || message.includes("wassup") || message.includes("wsg")) {
            response = "HI!";
        } else if (message.includes("how are you")) {
            response = random([
                "I'm pretty good...",
                "good",
                "How is ur day"
            ]);
        } else {
            response = random([
                "hello",
                "hi",
                ":)"
            ]);
        }
        typeNotifier.style.display = "block";
        setTimeout(function() {
            let newAIresponse = document.createElement("div");
            newAIresponse.classList.add("container", "darker");
            newAIresponse.innerHTML = `<img src="assistant.jpg" alt="Avatar">
            <p>${response}</p>
            <span class="time-right">${grabTime()}</span>`;
            chatBox.appendChild(newAIresponse);
            typeNotifier.style.display = "none";
            saveChatHistory();
        }, random(responseTimes));
    }
});
document.addEventListener("DOMContentLoaded", function () {
    loadChatHistory();
    document.getElementById("clearChat").addEventListener("click", clearChat);
});