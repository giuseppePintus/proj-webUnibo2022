async function login() {
  const user = document.getElementById("userInput").value;
  let pwd =  document.getElementById("passInput").value;

  if (!checkInput(user, pwd)) {
    return;
  }

  //calculate SHA-256 of the user password
  const hashpwd = await digestMessage(pwd);
  console.log('hashpwd: ' + hashpwd);

  const response  = await axios.post('./api-checkUser.php', {
    username: user,
    password: hashpwd
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  console.log(response);
  if(response.data == "ok"){
    window.location.href = './index.php';
  }
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
      remErrElem("Username");
  }

  if(pwd=='' || pwd == null){
      console.log('password non valida');
      addErrElem("Password");
      return false;
  }else{
      remErrElem("Password");
  }

  return true;
}

function addErrElem(msg){
  //check if already exists
  if(document.getElementById("err"+msg)!=null){
      return;   
  }
  //new message
  const node = document.createElement("p");
  const textnode = document.createTextNode( msg + " not valid");
  node.appendChild(textnode);
  node.setAttribute("class", "errorMsg" );
  node.setAttribute("id", "err" + msg);
  //add mesage to DOM
  document.getElementById("loginDiv").appendChild(node);  
}

function remErrElem(msg){
  //check if already exists
  if(document.getElementById("err" + msg) != null){
      document.getElementById("err" + msg).remove();
  }
}


let form = document.querySelector("#LoginForm");

form.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    login();
  }
});

//setup cookie for personalization
document.cookie = "colorPalette=" + JSON.stringify(["#4677a4","#a44677","#77a446","#375d80","#80375d","#5d8037"]) + "; expires = 0; path=/";
document.cookie = "nightMode=0; expires = 0; path=/";



