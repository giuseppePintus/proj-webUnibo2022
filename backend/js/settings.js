async function logout(){
    const resp = await axios.post("./api-logOut.php");
    if(resp.data == "ok"){
        window.location.href = './login.php';
    }    
    return;
}

async function sendPassword(){  
    const oldPass = document.getElementById("oldPassword").value;
    const newPass = document.getElementById("newPassword").value;

    const oldPassHash = await digestMessage(oldPass);
    const newPassHash = await digestMessage(newPass);

    const response  = await axios.post('./api-changePassword.php', {
        oldPass: oldPassHash,
        newPass: newPassHash
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      });   

      if(response.data == "ok"){
        window.location.href = './profile.php';    
      }
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

function nightMode(){
    let valCookie = getCookie("nightMode");
    if(valCookie == null || valCookie == "0"){
        setCookie("nightMode", "1");
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
    }else{
        setCookie("nightMode", "0");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
    }
    document.querySelector('input[name="NightButton"]').value = valCookie==0 ? "toggle dark" : "toggle light" ; 
}

function changePassword(){
    main.innerHTML = `
        <div class= "updateInfo"            
            <label for="fname">old password</label><br>
            <input type="password" id="oldPassword" name="oldPassword"><br>
            <hr>
            <label for="lname">New password</label><br>
            <input type="password" id="newPassword" name="newPassword"><br>
            <hr>
            <input type="submit" value="Apply" onclick = "sendPassword()">
        </div>`;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieAray = decodedCookie.split(';');
    for(let i = 0; i <cookieAray.length; i++) {
      let c = cookieAray[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length); //ritorno valore del cookie
      }
    }
    return null; //cookie non esiste
  }

function setCookie(cname, cvalue) {
    let expires = "expires = 0";
    document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}

const main = document.querySelector("main");

const search = document.querySelector(".searchForm");
search.innerHTML =  ``;

main.innerHTML = `
    <div class="settings">                      
        <input type="button"  name="LogoutButton" value="Log out"  onclick="logout()">
        <input type="button"  name="PersButton" value="Personalizza"  onclick="changeColor()">
        <input type="button"  name="NightButton" value=""  onclick="nightMode()">
        <input type="button"  name="changePassButton" value="cambia password"  onclick="changePassword()">
    </div>`;

document.querySelector('input[name="NightButton"]').value = getCookie("nightMode")==0 ? "toggle light" : "toggle dark" ; 
