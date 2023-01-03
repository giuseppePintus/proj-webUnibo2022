async function register(){
const email = document.getElementById('emailInput').value;
console.log(email);
const username = document.getElementById('userInput').value;
console.log(username);
const password = document.getElementById('passInput').value;
console.log(password);

const hashPassword = await digestMessage(password);
console.log(hashPassword);

const promiseResp = await axios.get('../backend/api-registerUser.php?email='+ email + '&username='+ username +'&password='+ hashPassword);
const resp = promiseResp.data;
console.log(resp);
window.location.replace("./login.php");

return;
}

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }