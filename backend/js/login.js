async function login() {
  let user = document.getElementById("userInput").value;
  let pwd =  document.getElementById("passInput").value;

  if (!checkInput(user, pwd)) {
    return;
  }

  const hashpwd = await digestMessage(pwd);
  console.log(hashpwd);


  
  const response = await axios.get('../backend/api-checkUser.php?user='+user);
  let challengeString = response.data;
  console.log(response.data);

  if(challengeString == "userNotFind"){
    alert("Username non valido");
    return;
  }

  const encChallenge = await encodeChallenge(hashpwd,challengeString);
  console.log(encChallenge);

  // const resp = await axios.get('../backend/login.php?challenge='+encChallenge);

  axios.post('../backend/login.php', {
    chalenge: + encChallenge
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


  console.log(resp);
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
  const textnode = document.createTextNode( msg + " -not valid");
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