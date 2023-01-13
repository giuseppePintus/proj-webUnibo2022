
function setCookie(){
    document.cookie = "cookieAccepted=1; expires = 0; path=/";
  // hide the cookie notification
  document.querySelector(".cookie-notification").style.display = "none";
}
if(getCookie("cookieAccepted") === null){
    document.cookie = "cookieAccepted=0; expires = 0; path=/";
}
if(getCookie("cookieAccepted")==0){
    document.querySelector("footer").innerHTML += `  <div class="cookie-notification">
    <p>This website uses cookies to ensure you get the best experience on our website. <a href="#">Learn more</a>
    <button onClick="setCookie()">Got it!</button>
    </p>
  </div>`;
}