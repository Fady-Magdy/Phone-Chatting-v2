// Phone Chatting area
let chatInput = document.querySelector(".screen-input input")
let sendBtn = document.querySelector(".screen-input .send-btn")
let screenChatArea = document.querySelector(".screen")
let sender = "me"
let msgNum = 0
let myName = "Fady"
let hisName = "Peter" 

let saveBtn = document.querySelector(".submit")
let clearBtn = document.querySelector(".clear-chat")
let meRadio = document.querySelector(".me-radio")
let himRadio = document.querySelector(".him-radio")
let myNameInput = document.querySelector("#my-name")
let hisNameInput = document.querySelector("#his-name")
let MyNameShow = document.querySelector(".names-view1")
let HisNameShow = document.querySelector(".names-view2")
let imageUploadBoxMe = document.querySelector(".image-choose-me")
let imageUploadBoxHim = document.querySelector(".image-choose-him")
let senderImg = document.getElementById("sender-img")
let senderIs = document.querySelector(".sender-name")

let ImageChosenMe = localStorage.getItem("MyImage") || "Images/sender-me.jpg"
let ImageChosenHim = localStorage.getItem("HisImage") || "Images/sender-him.jpg"

localStorage.MyName  != null ? myName  = JSON.parse(localStorage.MyName)  : myName ;
localStorage.HisName != null ? hisName = JSON.parse(localStorage.HisName) : hisName ;

if (sender == "me") {
    senderIs.innerHTML = `Sender is: ${myName}`
    senderImg.setAttribute("src" , ImageChosenMe)
}else {
    senderIs.innerHTML = `Sender is: ${hisName}`
    senderImg.setAttribute("src" , ImageChosenHim)
}

window.onload = () => screenChatArea.scrollTo(0, screenChatArea.scrollHeight)
let allMessages
localStorage.Messages != null ? allMessages = JSON.parse(localStorage.Messages) : allMessages = [] ;

// -------------------------------------------------------------------------
// On load ( to get chat filled from localStorage )
screenChatArea.innerHTML += `
<div class="message-container send">
    <div class="sender-image sender-me">
        <img src="${ImageChosenMe}" alt="">
    </div>
    <div class="sender-name-box sender-me-name hidden"></div>
    <div class="msg-and-date">
        <h4 class="message">Welcome Friend</h4>
        <p class="msg-date">10:00 AM</p>
    </div>
</div>
<div class="message-container recieve">
<div class="sender-image sender-him">
    <img src="${ImageChosenHim}" alt="">
</div>
<div class="sender-name-box sender-him-name hidden"></div>
<div class="msg-and-date">
<h4 class="message">Try to type something</h4>
<p class="msg-date">10:02 AM</p>
</div>
</div>


`
for (let i = 0 ; i < allMessages.length ; i++){
    var currentMsg = JSON.parse(localStorage.Messages)
    if (currentMsg[i].sender == "me"){
        screenChatArea.innerHTML += (`
        <div class="message-container send">
            <div class="sender-image sender-me">
                <img src="${ImageChosenMe}" alt="">
            </div>
            <div class="sender-name-box sender-me-name hidden"></div>
            <div class="msg-and-date">
                <h4 class="message">${currentMsg[i].msg}</h4>
                <p class="msg-date">${currentMsg[i].date}</p>
            </div>
        </div>
        `);
    }else if (currentMsg[i].sender == "him") {
        screenChatArea.innerHTML += (`
        <div class="message-container recieve">
            <div class="sender-image sender-him">
                <img src="${ImageChosenHim}" alt="">
            </div>
            <div class="sender-name-box sender-him-name hidden"></div>
            <div class="msg-and-date">
                <h4 class="message">${currentMsg[i].msg}</h4>
                <p class="msg-date">${currentMsg[i].date}</p>
            <div>
        </div>
        `);
    }
}
let CurrentNameBoxMe = document.querySelectorAll(".sender-me-name")
for (let i  = 0 ; i < CurrentNameBoxMe.length ; i++){
    CurrentNameBoxMe[i].innerHTML = myName
}
let CurrentNameBoxHim = document.querySelectorAll(".sender-him-name")
for (let i  = 0 ; i < CurrentNameBoxHim.length ; i++){
    CurrentNameBoxHim[i].innerHTML = hisName
}

// ---------------------------------------------------------------------------
// Show Name when touch image
function ShowNamesWhenTouchImage() {
    let senderImageMe = document.querySelectorAll(".sender-me")
    for (let i = 0 ; i < senderImageMe.length ; i++){
        senderImageMe[i].addEventListener("mouseenter" , ()=> {
            CurrentNameBoxMe[i].classList.remove("hidden")
            CurrentNameBoxMe[i].style.cssText = `
            opacity: 0;
            transform: translateY(20px)
            `
            setTimeout(() => {
                CurrentNameBoxMe[i].style.cssText = `
                opacity: 1;
                transform: translateY(0) scale(1.6);
                ` 
            }, 10);
        },)
        senderImageMe[i].addEventListener("mouseleave" , ()=> {
            CurrentNameBoxMe[i].style.cssText = `
            opacity: 0;
            transform: translateY(20px)
            `
            })
    }

    let senderImagehim = document.querySelectorAll(".sender-him")
    for (let i = 0 ; i < senderImagehim.length ; i++){
        senderImagehim[i].addEventListener("mouseenter" , ()=> {
            CurrentNameBoxHim[i].classList.remove("hidden")
            CurrentNameBoxHim[i].style.cssText = `
            opacity: 0;
            transform: translateY(20px)
            `
        setTimeout(() => {
            CurrentNameBoxHim[i].style.cssText = `
            opacity: 1;
            transform: translateY(0) scale(1.6);
            ` 
        }, 10);
        })
        senderImagehim[i].addEventListener("mouseleave" , ()=> {
            CurrentNameBoxHim[i].style.cssText = `
            opacity: 0;
            transform: translateY(20px)
            `
        })
    }
    let CurrentNameBoxMe = document.querySelectorAll(".sender-me-name")
    for (let i  = 0 ; i < CurrentNameBoxMe.length ; i++){
        CurrentNameBoxMe[i].innerHTML = myName
    }
    let CurrentNameBoxHim = document.querySelectorAll(".sender-him-name")
    for (let i  = 0 ; i < CurrentNameBoxHim.length ; i++){
        CurrentNameBoxHim[i].innerHTML = hisName
    }
}
ShowNamesWhenTouchImage()
// ---------------------------------------------------------------------------
// Send Message Function
let sendMsg = function () {
    if (chatInput.value != ""){

        let time = new Date;
        let minutes = time.getMinutes()
        let hours = time.getHours()
        let AmPm = "AM"
        hours > 12?   hours -= 12             : hours
        hours < 10?   hours = "0" + hours     : hours
        minutes < 10? minutes = "0" + minutes : minutes
        hours > 11? AmPm = "PM" : AmPm = "AM"
        let msgDate = `${hours}:${minutes} ${AmPm}`

        let msgData = { msg: chatInput.value ,sender: sender ,date: msgDate }
        allMessages.push(msgData)
        localStorage.setItem("Messages" ,JSON.stringify(allMessages))
        msgNum += 1

        if (sender == "me"){
            screenChatArea.innerHTML += (`
            <div class="message-container send">
                <div class="sender-image sender-me">
                    <img src="${ImageChosenMe}" alt="">
                </div>
                <div class="sender-name-box sender-me-name hidden"></div>
                <div class="msg-and-date">
                    <h4 class="message">${allMessages[allMessages.length-1].msg}</h4>
                    <p class="msg-date">${allMessages[allMessages.length-1].date}</p>
                <div>
            </div>
            `)
        }else {
            screenChatArea.innerHTML += (`
            <div class="message-container recieve">
                <div class="sender-image sender-him">
                    <img src="${ImageChosenHim}" alt="">
                </div>
                <div class="sender-name-box sender-him-name hidden"></div>
                <div class="msg-and-date">
                    <h4 class="message">${allMessages[allMessages.length-1].msg}</h4>
                    <p class="msg-date">${allMessages[allMessages.length-1].date}</p>
                <div>
            </div>
            `)
        
        }
        chatInput.value = ""
        chatInput.focus()
        screenChatArea.scrollTo(0, screenChatArea.scrollHeight)
        ShowNamesWhenTouchImage()
        

    }
}
sendBtn.addEventListener("click" , sendMsg)

chatInput.addEventListener("keyup" , (event) => {
    if (event.key == "Enter"){
        sendMsg()
    }
})
// Change sender by image
let senderImage = document.querySelector("#sender-img")
let senderChangeMenu = document.querySelector(".sender-img-menu")
senderImage.onclick = ( ()=>{
    senderChangeMenu.classList.toggle("hidden")
    let changeToMeBtn = document.querySelector(".changeToMe")
    let changeToHimBtn = document.querySelector(".changeToHim")

    changeToMeBtn.onclick = () => {
        sender = "me"
        senderIs.innerHTML = `Sender is: ${myName}`
        senderImage.setAttribute("src" , ImageChosenMe)
        senderChangeMenu.classList.add("hidden")
    }
    changeToHimBtn.onclick =  () => {
        sender = "him"
        senderIs.innerHTML = `Sender is: ${hisName}`
        senderImage.setAttribute("src" , ImageChosenHim)
        senderChangeMenu.classList.add("hidden")
    }
})
document.querySelector(".screen-input").onmouseleave = ()=>{
    senderChangeMenu.classList.add("hidden")
}

// ---------------------------------------------------------------------
// Time
setInterval(() => {
    let time = new Date;
    let minutes = time.getMinutes()
    let hours = time.getHours()
    let AmPm = "AM"
    let timeArea = document.querySelector(".time")
    
    hours > 11? AmPm = "PM" : AmPm = "AM"
    hours > 12?   hours -= 12             : hours
    hours < 10?   hours = "0" + hours     : hours
    minutes < 10? minutes = "0" + minutes : minutes
    
        timeArea.innerHTML =`${hours}:${minutes} ${AmPm}`
}, 1000);
// ------------------------------------------------------------------------
// input right Side

MyNameShow.innerHTML = "My Name: " + myName
HisNameShow.innerHTML = "His Name: " + hisName

// Save Button
saveBtn.addEventListener("click" , () => {
    if (meRadio.checked == true) {
        sender = "me"
    }
    if (himRadio.checked == true) {
        sender = "him"
    }
    meRadio.checked = false
    himRadio.checked = false

    if (myNameInput.value != ""){
        localStorage.MyName = JSON.stringify(myNameInput.value) 
        myName = JSON.parse(localStorage.getItem("MyName"))
        myNameInput.value = ""
        MyNameShow.innerHTML = "My Name: " + myName
        let CurrentNameBoxMe = document.querySelectorAll(".sender-me-name")
        for (let i  = 0 ; i < CurrentNameBoxMe.length ; i++){
            CurrentNameBoxMe[i].innerHTML = myName
        }
    }
    if (hisNameInput.value != ""){
        localStorage.HisName =  JSON.stringify(hisNameInput.value) 
        hisName = JSON.parse(localStorage.getItem("HisName")) 
        hisNameInput.value =""
        HisNameShow.innerHTML = "His Name: " + hisName
        let CurrentNameBoxHim = document.querySelectorAll(".sender-him-name")
        for (let i  = 0 ; i < CurrentNameBoxHim.length ; i++){
            CurrentNameBoxHim[i].innerHTML = hisName
        }
    }

    if (sender == "me") {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${myName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
    }else {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${hisName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenHim)
    }
    
})

// Clear Button
clearBtn.addEventListener("click" , () => {
    document.querySelector(".page-cover").classList.remove("hidden")
    document.querySelector(".areYouSure").classList.remove("hidden")

    document.querySelector(".yes").addEventListener("click" , () => {
        localStorage.removeItem("Messages")
        msgNum = 0
        screenChatArea.innerHTML = ""
        document.querySelector(".page-cover").classList.add("hidden")
        document.querySelector(".areYouSure").classList.add("hidden")
    })
    document.querySelector(".no").addEventListener("click" , () => {
        document.querySelector(".page-cover").classList.add("hidden")
        document.querySelector(".areYouSure").classList.add("hidden")
    })
})

// Upload Image
imageUploadBoxMe.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load" , ()=> {
        saveBtn.addEventListener("click" , ()=> {
            localStorage.setItem("MyImage" , reader.result)
            window.location.reload()
        })
    });
    reader.readAsDataURL(this.files[0]);
})
imageUploadBoxHim.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load" , ()=> {
        saveBtn.addEventListener("click" , ()=> {
            localStorage.setItem("HisImage" , reader.result)
            window.location.reload()
        })
    });
    reader.readAsDataURL(this.files[0]);
})

// switch sender using Ctrl
chatInput.addEventListener("keydown" , (event) => {
    if (event.key == "Control"){
        if (sender == "me"){
            sender = "him"
        }else {
            sender = "me"
        }
    }
    if (sender == "me") {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${myName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
    }else {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${hisName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenHim)
    }
})