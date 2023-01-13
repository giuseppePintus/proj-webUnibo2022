async function login() {
  const user = document.getElementById("userInput").value;
  let pwd =  document.getElementById("passInput").value;

  if (!checkInput(user, pwd)) {
    return;
  }

  //calculate SHA-256 of the user password
  const hashpwd = await digestMessage(pwd);


  const response  = await axios.post('./api-checkUser.php', {
    username: user,
    password: hashpwd
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  if(response.data == "ok"){
    window.location.href = './index.php';
  }else if(response.data == "Brute"){
    printError("Too many attempts");    
  }
  else if(response.data == "usrPwd"){
    printError("Username or Password not valid");    
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
    printError("Username cannot be empty")
    return false;
  }

  if(pwd=='' || pwd == null){
    printError("Password cannot be empty")
    return false;
  }
  return true;
}


function printError(msg){
  //remove existing error message
  let err = document.querySelector(".errorMsg");
  if(err !=null){ 
    err.remove();
  }

  const node = document.createElement("p");
  const textnode = document.createTextNode(msg);
  node.appendChild(textnode);
  node.setAttribute("class", "errorMsg" );
  //aggiungo elemento al dom
  document.querySelector("#loginDiv").appendChild(node);  
  
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
document.cookie = "cookieAccepted=0; expires = 0; path=/";


