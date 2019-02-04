const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const CryptoJS = require('crypto-js');
var Mnemonic = require('@dashevo/dashcore-mnemonic');

var seedWords; // = "chair inch unusual slam lava present office position address easy valley junior";


const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "setValue",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getValue",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const address = '0x59d8d1af2683a72a4eac2d9d1b155802471e5b1d';

var contract;
var accounts;
var web3;

var setValue = async (ipfsHash) => {
    console.log("***********" + ipfsHash);
    await contract.methods.setValue(ipfsHash).send(
        {
            from: accounts[0],
            gas: '4700000'
        }
    );
    console.log("test");
}

var getValue = async () => {
    var ipfsHashe = '';
    try {
        ipfsHashe = await contract.methods.getValue().call(
            {
                from: accounts[0],
                gas: '3000000'
            }
        );
    } catch (err) {
        console.log(err);
    }
    //console.log("exisiting hash:"+ipfsHashe);
    return ipfsHashe;
}

var setPassword = async (url, username, password) => {
    var ipfsHash = await getValue();
    var obj;
    console.log(ipfsHash);
    if (ipfsHash == '') {
        console.log("null");
        obj = {};
    }
    else {
        console.log("some hash");
        obj = await getJson(ipfsHash);
        console.log("=============" + obj);
    }
    obj[url] = [username, password];
    console.log(obj);
    var s = await addJson(obj);
    return s;
}

var addJson = async (obj) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://api.pinata.cloud/pinning/pinJSONToIPFS', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("pinata_api_key", "2ea945841850a3b8815f");
    xhr.setRequestHeader("pinata_secret_api_key", "902c30af4d0d6a4260d7eed1344d8b847cb43acec69d8995bf2c0f06abfae883");

    xhr.onreadystatechange = async function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var response = this.responseText;
            //response = response.json();
            var response = JSON.parse(response);
            console.log(response['IpfsHash']);
            await setValue(response['IpfsHash']);

        }
    }

    await xhr.send(JSON.stringify(obj));
    return true;
}


var getJson = async (ipfsHash) => {
    var url = "https://gateway.pinata.cloud/ipfs/" + ipfsHash;
    var result = await fetch(url);
    result = await result.json();
    console.log("result:" + result);
    return result;
};

var encrypt = async (password) => {
    //console.log(password);
    //console.log(seedWords);
    console.log(password,seedWords);
    var ciphertext = CryptoJS.AES.encrypt(password, seedWords).toString();
    //console.log(ciphertext);
    return ciphertext;
}

var decrypt = async (ciphertext) => {
    var bytes = await CryptoJS.AES.decrypt(ciphertext, seedWords);
    var originalText = await bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText); // 'my message'  
    return originalText;
}

window.generateSeed = () => {
    var code = new Mnemonic();
    return code.toString();
}

window.login = async (seedwords) => {
    seedWords = seedwords;
    const provider = new HDWalletProvider(
        seedWords,
        'https://ropsten.infura.io/v3/22be87df8e694b33a0c0b7acf4d67e9d'
    );
    web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi, address);
    accounts = await web3.eth.getAccounts();
}

window.addPassword = async (url, user, password) => {
    var encrypt_user = await encrypt(user);
    var encrypt_password = await encrypt(password);
    return (await setPassword(url, encrypt_user, encrypt_password));
}

window.getPassword = async (url) => {
    var ipfsHash = await getValue();
    var obj;
    if (ipfsHash == '')
        console.log("user has no added credentials");
    else
        obj = await getJson(ipfsHash);
    if (Object.keys(obj).length > 0 && Object.keys(obj).indexOf(url) !== -1) {
        list = obj[url];
        var user = await decrypt(list[0]);
        var password = await decrypt(list[1]);
        return [user, password, 1];
    }
    else {
        console.log("url not present!");
        return ["", "", 0];
    }
    //addJson(obj);
}