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

    console.log("old: " + oldPass + " | new: " + newPass);
    const oldPassHash = await digestMessage(oldPass);
    const newPassHash = await digestMessage(newPass);
    console.log("oldHash: " + oldPassHash + " | newHash: " + newPassHash);

    const response  = await axios.post('./api-changePassword.php', {
        oldPass: oldPassHash,
        newPass: newPassHash
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json'
      });
    
      console.log(response.data);

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
    let root = document.documentElement;

    root.style.setProperty('--first-color', "black");
    root.style.setProperty('--second-color',  "white");
    root.style.setProperty('--invert',  "1");
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



const page = document.querySelector(".settings");
const main = document.querySelector("main");
const search = document.querySelector(".searchForm");

search.innerHTML =  ``;
main.innerHTML = `
    <div class="settings">                      
        <input type="button"  name="LogoutButton" value="Log out"  onclick="logout()">
        <input type="button"  name="PersButton" value="Personalizza"  onclick="changeColor()">
        <input type="button"  name="NightButton" value="Modalita' notte"  onclick="nightMode()">
        <input type="button"  name="changePassButton" value="cambia password"  onclick="changePassword()">
    </div>`;