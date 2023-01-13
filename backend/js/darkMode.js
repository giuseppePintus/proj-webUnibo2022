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

let darkCookie = getCookie("nightMode");
let paletteCookie = getCookie("colorPalette");
let arrayColor = JSON.parse(paletteCookie);

if(darkCookie == null || darkCookie == "0"){
  document.documentElement.style.setProperty('--first-color', arrayColor[0]);
  document.documentElement.style.setProperty('--second-color', arrayColor[1]);
  document.documentElement.style.setProperty('--third-color', arrayColor[2]);
  document.documentElement.style.setProperty('--base-color', "#fff");
  document.documentElement.style.setProperty('--text-color', "#000");
  document.documentElement.style.setProperty('--invert', 0);
}else{
  document.documentElement.style.setProperty('--first-color', arrayColor[3]);
  document.documentElement.style.setProperty('--second-color', arrayColor[4]);
  document.documentElement.style.setProperty('--third-color', arrayColor[5]);
  document.documentElement.style.setProperty('--base-color', "#222");
  document.documentElement.style.setProperty('--text-color', "#fff");
  document.documentElement.style.setProperty('--invert', 1);
}