let getseedwords = document.getElementById('getseedwords');
let postseedwords = document.getElementById('postseedwords');
let seedwords = document.getElementById('seedwords');
let submitseedwords = document.getElementById('submitseedwords');
let addcreds = document.getElementById('addcreds');
let add = document.getElementById('add');
let login = document.getElementById('login');
// // let urlname = document.getElementById('urlname');
let username = document.getElementById('username');
let password = document.getElementById('password');

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
addcreds.addEventListener('click',showaddpage);
add.addEventListener('click',addsubmit);
login.addEventListener('click',fire);

chrome.storage.sync.get(['key'], function(result) {
  if(result.key === true){
    console.log("already generated!!");
    enterseedwords();
  }
});

function generateseedwords(){
  //generate function
  var seeds = "here are seed words";
  chrome.storage.sync.get(['key'], function(result) {
    if(result.key === true){
      console.log("already generated!!");
      enterseedwords();
    }
    else{
      chrome.storage.sync.set({'key': true}, function() {
        console.log("done!!");
        enterseedwords();
      });
    }
  });

  // chrome.storage.local.get(['key'], function(result) {
  //   console.log(result.key);
  // });
}

function enterseedwords(){
  //Show enter seedwords
  getseedwords.style.display = 'none';
  postseedwords.style.display = 'none';
  seedwords.style.display = 'block';
  submitseedwords.style.display = 'block';
  addcreds.style.display = 'none';
  add.style.display = 'none';
  login.style.display = 'none';
  // urlname.style.display = 'none';
  username.style.display = 'none';
  password.style.display = 'none'
}

function verifyseedwords(){
  // truffle call
  // if true set in local storage and show Login button and add button
  // else same enter seedwords
  getseedwords.style.display = 'none';
  postseedwords.style.display = 'none';
  seedwords.style.display = 'none';
  submitseedwords.style.display = 'none';
  addcreds.style.display = 'inline-block';
  add.style.display = 'none';
  login.style.display = 'inline-block';
  // urlname.style.display = 'none';
  username.style.display = 'none';
  password.style.display = 'none'
}

function showaddpage(){
  //show add details 
  getseedwords.style.display = 'none';
  postseedwords.style.display = 'none';
  seedwords.style.display = 'none';
  submitseedwords.style.display = 'none';
  addcreds.style.display = 'none';
  add.style.display = 'inline-block';
  login.style.display = 'none';
  // urlname.style.display = 'block';
  username.style.display = 'block';
  password.style.display = 'block'
}

async function addsubmit(){
  // send data and show add/login
  var data = {
    // url: urlname.value,
    user: username.value,
    pass: password.value
  }
  var test = await encryptPassword(data["user"]+data["pass"]);
  console.log("hash:"+test);
  verifyseedwords();
}

function fire(){
  //fetch data and call general
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