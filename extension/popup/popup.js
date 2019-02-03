let getseedwords = document.getElementById('getseedwords');
let postseedwords = document.getElementById('postseedwords');
let seedwords = document.getElementById('seedwords');
let submitseedwords = document.getElementById('submitseedwords');
let addcreds = document.getElementById('addcreds');
let add = document.getElementById('add');
let Login = document.getElementById('login');
let Logout = document.getElementById('logout');
// // let urlname = document.getElementById('urlname');
let username = document.getElementById('username');
let password = document.getElementById('password');
let showseeds = document.getElementById('showseeds');

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
Login.addEventListener('click',fire);
Logout.addEventListener('click',logout);

var alreadyFlag = 0;

chrome.storage.sync.get(['key'], function(result) {
  if(result.key === true){
    console.log("already generated!!");
    //enterseedwords();
    getseedwords.style.display = 'none';
    postseedwords.style.display = 'none';
    seedwords.style.display = 'none';
    submitseedwords.style.display = 'none';
    addcreds.style.display = 'block';
    add.style.display = 'none';
    Login.style.display = 'block';
    // urlname.style.display = 'none';
    username.style.display = 'none';
    password.style.display = 'none';
    showseeds.style.display = 'none';
    Logout.style.display = 'block';
    Logout.style.width = '250px';
  }
  else
    console.log("oooooooooooooooooooo");
});

function generateseedwords(){
  //generate function
  //var seeds = "here are seed words";
  chrome.storage.sync.get(['key'], function(result) {
    if(result.key === true){
      console.log("already generated!!");
      //enterseedwords();
      getseedwords.style.display = 'none';
      postseedwords.style.display = 'none';
      seedwords.style.display = 'none';
      submitseedwords.style.display = 'none';
      addcreds.style.display = 'block';
      add.style.display = 'none';
      Login.style.display = 'block';
      // urlname.style.display = 'none';
      username.style.display = 'none';
      password.style.display = 'none';
      showseeds.style.display = 'none';
      Logout.style.display = 'block';
      Logout.style.width = '250px';
    }
    else{
      var seedWords = generateSeed();
      chrome.storage.sync.set({'key': true}, function() {
        console.log("done!!");
        showSeeds(seedWords);
        //enterseedwords();
      });
    }
  });

  function showSeeds(seedWords){
                 
    // document.body.removeChild(el);
    // if (selected) {                                 
      // document.getSelection().removeAllRanges();    
      // document.getSelection().addRange(selected);
    // }
    while (showseeds.firstChild) {
      showseeds.removeChild(showseeds.firstChild);
    }
    const el = document.createElement('textarea');  
    el.value = seedWords;                           
    el.setAttribute('readonly', '');                
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      
    document.body.appendChild(el);                  
    const selected =            
      document.getSelection().rangeCount > 0        
        ? document.getSelection().getRangeAt(0)     
        : false;                                    
    el.select();

    seedWordsx = seedWords.split(" ");
    // console.log(seedWords);
    getseedwords.style.display = 'none';
    postseedwords.style.display = 'none';
    seedwords.style.display = 'none';
    submitseedwords.style.display = 'none';
    addcreds.style.display = 'none';
    if(alreadyFlag == 1){
      add.innerHTML = "Edit"
    }else{
      add.innerHTML = "Add"
    }
    add.style.display = 'none';
    Login.style.display = 'none';
    // urlname.style.display = 'none';
    username.style.display = 'none';
    password.style.display = 'none';  
    // showseeds.innerHTML = seedWords;
    var cpySeed = document.createElement("i");
    cpySeed.classList.add("fa");
    cpySeed.classList.add("fa-copy");
    cpySeed.addEventListener("click",(e) => { 
      document.execCommand('copy');
      alert("seedPhrase copied!");})
    var seedheading = document.createElement("span");
    seedheading.classList.add("seedHead");
    seedheading.innerHTML = "Seedphrase";
    showseeds.appendChild(seedheading);
    showseeds.appendChild(cpySeed);
    showseeds.appendChild(document.createElement("br"));
    seedWordsx.forEach((seed) => {
      // console.log(seed);
      var seedE = document.createElement("div");
      seedE.innerHTML = " "+seed+" ";
      seedE.classList.add("seed");
      showseeds.appendChild(seedE);
    });
    showseeds.style.display = 'block';
    Logout.style.display = 'block';
    Logout.style.width = '250px';
    add.style.width = '100px';
  }

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
  Login.style.display = 'none';
  // urlname.style.display = 'none';
  username.style.display = 'none';
  password.style.display = 'none';
  showseeds.style.display = 'none';
  Logout.style.display = 'block';
}

async function verifyseedwords(){
  // truffle call
  // if true set in local storage and show Login button and add button
  // else same enter seedwords
  var loadingC = document.getElementsByClassName("loader")[0];
  var mainC = document.getElementsByClassName("main")[0];
  // loadingC.style.display = "block";
  // mainC.style.display = "none";
  console.log(seedwords.value);
  await login(seedwords.value);
  // mainC.style.display = "flex";
  // loadingC.style.display = "none"; 

  chrome.storage.sync.set({'key': true}, function() {
    console.log("done!!!!!");
  });
  getseedwords.style.display = 'none';
  postseedwords.style.display = 'none';
  seedwords.style.display = 'none';
  submitseedwords.style.display = 'none';
  addcreds.style.display = 'block';
  add.style.display = 'none';
  Login.style.display = 'block';
  // urlname.style.display = 'none';
  username.style.display = 'none';
  password.style.display = 'none';
  showseeds.style.display = 'none';
  Logout.style.display = 'block';
}

function showaddpage(){
  //show add details 
  getseedwords.style.display = 'none';
  postseedwords.style.display = 'none';
  seedwords.style.display = 'none';
  submitseedwords.style.display = 'none';
  addcreds.style.display = 'none';
  if(alreadyFlag == 1){
    add.innerHTML = "Edit"
  }else{
    add.innerHTML = "Add"
  }
  add.style.display = 'block';
  Login.style.display = 'none';
  // urlname.style.display = 'block';
  username.style.display = 'block';
  password.style.display = 'block';
  showseeds.style.display = 'none';
  Logout.style.display = 'block';
}

function logout(){
  chrome.storage.sync.set({'key': false}, function() {
    console.log("logged out");
    getseedwords.style.display = 'block';
    postseedwords.style.display = 'block';
    seedwords.style.display = 'none';
    submitseedwords.style.display = 'none';
    addcreds.style.display = 'none';
    add.style.display = 'none';
    Login.style.display = 'none';
    // urlname.style.display = 'block';
    username.style.display = 'none';
    password.style.display = 'none';
    showseeds.style.display = 'none';
    Logout.style.display = 'none';
  })
}

async function addsubmit(){
  // send data and show add/login
    // url: urlname.value,
  let params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params,async function send(atabs,text) {
    var url = atabs[0].url;
    var user = username.value;
    var pass = password.value;
    //var test = await encryptPassword(data["user"]+data["pass"]);
    //console.log("hash:"+test);
    var loadingC = document.getElementsByClassName("loader")[0];
    var mainC = document.getElementsByClassName("main")[0];
    loadingC.style.display = "block";
    mainC.style.display = "none";
    await addPassword(url,user,pass);
    await verifyseedwords();
    setTimeout(() => {
      mainC.style.display = "flex";
      loadingC.style.display = "none";
    },30000)
    }
  );
}

function fire(){
  //fetch data and call general
  let params = {
    active: true,
    currentWindow: true
  }
  chrome.tabs.query(params,async function send(atabs,text) {
    console.log(atabs[0].url);
    var data = await getPassword(atabs[0].url);
    var text = {
      username:data[0],
      password:data[1]
    };
    alreadyFlag = data[2];
    chrome.tabs.sendMessage(atabs[0].id,text);
  }
  );
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
    console.log("text:",text);
    let message = text;
    console.log(message);
  }
  );
}