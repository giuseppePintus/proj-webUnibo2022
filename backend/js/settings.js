async function logout(){
    const resp = await axios.post("./api-logOut.php");
    if(resp.data == "ok"){
        window.location.href = './login.php';
    }    
    return;
}

async function setNewPassword(){  
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;

  if(oldPass == "" || newPass == ""){
    console.log("campi vuoti");
    return;
  }
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
  return;
}

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

function nightMode(){
  let paletteCookie = getCookie("colorPalette");
  let arrayColor = JSON.parse(paletteCookie);

  let valCookie = getCookie("nightMode");
  if(valCookie == null || valCookie == "0"){
      setCookie("nightMode", "1");
    document.documentElement.style.setProperty('--first-color', arrayColor[3]);
    document.documentElement.style.setProperty('--second-color', arrayColor[4]);
    document.documentElement.style.setProperty('--third-color', arrayColor[5]);
    document.documentElement.style.setProperty('--base-color', "#000");
    document.documentElement.style.setProperty('--text-color', "#fff");
    document.documentElement.style.setProperty('--invert', 1);
  }else{
    setCookie("nightMode", "0");
    document.documentElement.style.setProperty('--first-color', arrayColor[0]);
    document.documentElement.style.setProperty('--second-color', arrayColor[1]);
    document.documentElement.style.setProperty('--third-color', arrayColor[2]);
    document.documentElement.style.setProperty('--base-color', "#fff");
    document.documentElement.style.setProperty('--text-color', "#000");
    document.documentElement.style.setProperty('--invert', 0);
  }
  document.querySelector('input[name="NightButton"]').value = valCookie == 0 ? "toggle light" : "toggle dark" ; 
  return;
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

function changePassword(){
  main.innerHTML = `
      <div class= "updateInfo"            
          <label for="fname">old password</label><br>
          <input type="password" id="oldPassword" name="oldPassword"><br>
          <hr>
          <label for="lname">New password</label><br>
          <input type="password" id="newPassword" name="newPassword"><br>
          <hr>
          <input type="submit" value="Apply" onclick = "setNewPassword()">
      </div>`;
}

function changeColor(){
  main.innerHTML =`
    <div class="selectColor">
      <label for="colorPicker">Choose your base color</label><br>
      <input type="color" id="colorPicker" name="colorPicker" value="#ff0000"><br>
      <input type="submit" value="Select" onClick="setPalette()">
    </div>
  `;
  return;
}

function setPalette(){
  let color = document.querySelector("#colorPicker").value;
  let hsl = hexToHsl(color);

  console.log(hsl);

  // create variations of the color by adjusting the hue value
  let lightPalette = [
      hslToHex(hsl), 
      hslToHex({...hsl, h: (hsl.h + 120) % 360}), 
      hslToHex({...hsl, h: (hsl.h + 240) % 360})
      ];

  let darkPalette = [
      hslToHex({...hsl, l:(l-10)}), 
      hslToHex({...hsl, h: (hsl.h + 120) % 360, l: (l-10)}), 
      hslToHex({...hsl, h: (hsl.h + 240) % 360, l: (l-10)})
      ];
  let concatArray = lightPalette.concat(darkPalette) ; 
      console.log(concatArray)
  //salvo valori in un cookie
  setCookie("colorPalette", JSON.stringify(concatArray) );
  window.location.href = './settings.php';
  return;
}

function hexToHsl(H) {
  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  console.log(r + " " + g + " " + b)
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b);
  let cmax = Math.max(r,g,b);
  let delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {h, s, l}; 
}

function hslToHex({h, s, l}) {
  s /= 100;
  l /= 100;
  
  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
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

document.querySelector('input[name="NightButton"]').value = getCookie("nightMode")==0 ? "toggle dark" : "toggle light" ; 
