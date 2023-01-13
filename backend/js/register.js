async function register(){

  const email = document.getElementById('emailInput');
  const user = document.getElementById('userInput');
  const password = document.getElementById('passInput');

  if(email.value == '' || user.value == '' || password.value == '' ){
    printError("Missing data");
    return;
  }

  if(!email.checkValidity()){
    printError("Email not valid");
    return;
  }

  if(password.value.length < 8){
    document.querySelector("#passInput").classList.add("invalid");
    printError("Password too short");
   
    return;
  }

  const hashPassword = await digestMessage(password.value);

  const result = await axios.post("./api-registerUser.php", {
                                    email: email.value,
                                    username: user.value,
                                    password: hashPassword
                                  });


  let resData = result.data;
  if( resData == "OK"){
    window.location.href = './login.php';
  }else if(resData=="username not available"){
    document.querySelector("#userInput").classList.add("invalid");
    printError(resData);
  }else if(resData==" missing data"){
    printError("Error during communication with server");
  }
  return;
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
function resetClass(){
  document.querySelector("#userInput").classList.remove("invalid");
  document.querySelector("#passInput").classList.remove("invalid");

}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }