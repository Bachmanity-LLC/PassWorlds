console.log("Chrome extension go?");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message);
    //let paragraphs = document.getElementsByTagName('p');
    //   for (elt of paragraphs) {
    //     elt.innerHTML = message.txt;
    //   }
    let username = document.querySelectorAll('[type="text"]');
    let password = document.querySelectorAll('[type="password"]');
    let sub = document.querySelectorAll('[type="submit"]');
    //let sub = document.querySelectorAll('[type="submit"]');
    console.log(username);
    console.log(password);
    username[0].value = message["username"];
    password[0].value = message["password"];
    console.log(message["username"]);
    console.log(message["password"]);

    // subInp[0].addEventListener("click", (e) => {
        // e.preventDefault();
        // console.log(passInp[0].value);
        // console.log(e.target);
    // })
}