function login(){
    let user = document.getElementById("userInput").value;
    let pwd =  document.getElementById("passInput").value;
 
    
    if(!checkInput(user, pwd)){
     return;
    }
 
    const xhttp = new XMLHttpRequest();
    const challengeString = xhttp.responseText;
     xhttp.open("GET", "login.php?fun=reqChg&user=" + user);    
     xhttp.send();   
 
     if(challengeString != null){
 
         let sha255 = SubtleCrypto.digest('SHA-256',pwd).then
 
 
     }
      
 
     
 }
 //generate sha256 locally using SubtleCrypto ref: https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd
 function hash(string) {
     const utf8 = new TextEncoder().encode(string);
     return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
       const hashArray = Array.from(new Uint8Array(hashBuffer));
       const hashHex = hashArray
         .map((bytes) => bytes.toString(16).padStart(2, '0'))
         .join('');
       return hashHex;
     });
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