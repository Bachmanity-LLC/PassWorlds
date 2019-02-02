// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.password == "hello")
//             console.log(request.password);
//             sendResponse({ farewell: "goodbye" });
//     }
// );

let passInp = document.querySelectorAll('[type="password"]');
let subInp = document.querySelectorAll('[type="submit"]');

subInp[0].addEventListener("click",(e) => {
    e.preventDefault();
    console.log(passInp[0].value);
    console.log(e.target);
})
