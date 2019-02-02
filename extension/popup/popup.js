let getseedwords = document.getElementById('getseedwords');
let postseedwords = document.getElementById('postseedwords');
let seedwords = document.getElementById('seedwords');
let submitseedwords = document.getElementById('submitseedwords');

// useri.onclick = function (element) {
//   let color = element.target.value;
  /*
  currentWindow => checks code for the tab, not necessarily active, but one which is parent
  and led to other tabs, for tabs.query. For events, topmost tab is taken
  active => checks for active tab
  */
  

//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       // tab id, where to run the script, defaults to activetab of current window

//       tabs[0].id,
//       { file: 'script.js' }
//     )
//   });
// };

getseedwords.addEventListener('click',generateseedwords);
postseedwords.addEventListener('click',enterseedwords);
submitseedwords.addEventListener('click',verifyseedwords);

function generateseedwords(){
  //generate function
  var seeds = "here are seed words";
  chrome.storage.sync.get(['key'], function(result) {
    if(result.key === true){
      console.log("already generated!!");
      //Show enter seedwords
    }
    else{
      chrome.storage.sync.set({'key': true}, function() {
        console.log("done!!");
        //Show enter seedwords
      });
    }
  });

  // chrome.storage.local.get(['key'], function(result) {
  //   console.log(result.key);
  // });
}

function enterseedwords(){
  //Show enter seedwords
}

function verifyseedwords(){
  // truffle call
  // if true show Login button and add button
  // else same enter seedwords
}

function general(text) {
  let params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params,function send(tabs,text) {
    //console.log("got tabs");
    //console.log(tabs);
    // send a message to the content script
    let message = text;
    console.log(message);
    chrome.tabs.sendMessage(tabs[0].id, message);
  }
  );
}