async function register(){

  const email = document.getElementById('emailInput').value;
  const user = document.getElementById('userInput').value;
  const password = document.getElementById('passInput').value;

  if(email == '' || user == '' || password == '' ){
    if(document.getElementsByClassName("errorMsg")!=null){  
    }else{
      const node = document.createElement("p");
      const textnode = document.createTextNode( "Missing data");
      node.appendChild(textnode);
      node.setAttribute("class", "errorMsg" );
      //aggiungo elemento al dom
      document.getElementById("loginDiv").appendChild(node);  
    }
    console.log("Missing data");
    return;
  }


  const hashPassword = await digestMessage(password);

  console.log("email: " + email + " | username: " + user + " | passwordHash: " + hashPassword);

  const result = await axios.post("./api-registerUser.php", {
                                    email: email,
                                    username: user,
                                    password: hashPassword
                                  });

  console.log(result.data);

  if( result.data == "OK")
  {
    window.location.replace('http://localhost/backend/login.php');
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