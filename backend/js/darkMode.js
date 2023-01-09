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
let valCookie = getCookie("nightMode");

if(valCookie == null || valCookie == "0"){
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
}else{
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
}
