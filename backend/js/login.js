async function login() {
  let user = document.getElementById("userInput").value;
  let pwd =  document.getElementById("passInput").value;

  if (!checkInput(user, pwd)) {
    return;
  }

  //calculate SHA-256 of the user password
  const hashpwd = await digestMessage(pwd);
  console.log('hashpwd: ' + hashpwd);

  axios.post('./api-checkUser.php', {
    username: user,
    password: hashpwd
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  }).then(response => {
      // handle success
      if(response.data == 'ok'){
        window.location.replace('./index.php');
      }
      else{
        console.log(response.data);
      }
    })
    .catch(error => {
      // handle error
      console.log("errore usr:"+user+"  pass: "+hashpwd);
      console.log(error);
      addErrElem('Username or Password');
    });

    return;
}

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
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