async function login() {
  let user = document.getElementById("userInput").value;
  let pwd =  document.getElementById("passInput").value;

  if (!checkInput(user, pwd)) {
    return;
  }

  const promiseResp = await axios.get('../backend/api-checkUser.php?user=' + user);
  const resp = promiseResp.data;
// console.log("stampa tutto__________")
 console.log(resp);
//   console.log(" stampa res");
//   console.log(resp['res']);

  if(resp['res'] != null || resp['res'] ==  'userNotFound'){
    addErrElem('Username');
    //alert("Username non valido");
    return;
  }
  console.log('user valido');
  let challengeString = resp['string'];
  console.log('challenge string: ' + challengeString);

  //calculate SHA-256 of the user password
  const hashpwd = await digestMessage(pwd);
  console.log('hashpwd: ' + hashpwd);

  //sing hashed password as key for AES encription of challenge
  const encChallenge = await encodeChallenge(hashpwd,challengeString);
  console.log('cal challenge response: ' + encChallenge);

  // const resp = await axios.get('../backend/login.php?challenge='+encChallenge);
  //console.log(encChallenge);
  //send back the response





  // let encChallenge= "sdhifgdks";
  // axios.post("./api-challengeResponse.php?challenge="+ encChallenge , {
  //   challenge: encChallenge
  // }).then(function (response) {
  //  // console.log("tutto ok, dovrebbe reindirizzare ----------");
  //   console.log(response.data);   
  //   if(response.data == 'OK'){
  //     window.location.replace("../backend/index.php");
  //   }
  // }).catch(function (error) {
  //   console.log(error);
  // });



  const result = await axios.get("./api-challengeResponse.php?challenge="+ encChallenge);
  console.log(result.data);

  return;
}

















 //generate sha256 locally using SubtleCrypto ref: https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd


async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashBuffer;
}

async function encodeChallenge(password, challenge) {
  const encoder = new TextEncoder(); // crea un oggetto TextEncoder
  const decoder = new TextDecoder()
  let resChallenge = "";
  const str = encoder.encode(challenge);

  const pwdData = encoder.encode(password); // codifica la stringa in formato UTF-8

  // genera la chiave SHA-256
  const hash = await crypto.subtle.digest("SHA-256", pwdData);

  // importa la chiave AES da una stringa codificata in formato SHA-256
  const key = await crypto.subtle.importKey(
    "raw", // formato della chiave
    hash, // chiave da importare
    {
      name: "AES-GCM",
      length: 256, // specifica la lunghezza della chiave in bit
    },
    false, // non estraibile
    ["encrypt", "decrypt"] // usi consentiti
  );

  // cifra i dati con la chiave
  resChallenge = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: crypto.getRandomValues(new Uint8Array(12)), // vettore di inizializzazione casuale
    },
    key, // chiave di crittografia
    str // dati da cifrare
  );
let res  = decoder.decode(resChallenge,Int8Array);
  return res;
}

function checkInput(usr, pwd){
  if(usr=='' || usr == null){
    console.log('username non valido');
    addErrElem("Username");
    return false;
  }else{
      remErrElem("Username")
  }

  if(pwd=='' || pwd == null){
      console.log('password non valida');
      addErrElem("Password");
      return false;
  }else{
      remErrElem("Password")
  }

  return true;

}

function addErrElem(msg){
  //se esiste gia non faccio ninete
  if(document.getElementById("err"+msg)!=null){
      return    
  }
  //creo elemento
  const node = document.createElement("p");
  const textnode = document.createTextNode( msg + " not valid");
  node.appendChild(textnode);
  node.setAttribute("class", "errorMsg" );
  node.setAttribute("id", "err" + msg);
  //aggiungo elemento al dom
  document.getElementById("loginDiv").appendChild(node);  
}


function remErrElem(msg){
  //controllo esisstenza elemento
  if(document.getElementById("err" + msg) != null){
      document.getElementById("err" + msg).remove();
  }
}