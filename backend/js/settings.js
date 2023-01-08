async function logout(){
    const resp = await axios.post("./api-logOut.php");
    if(resp.data == "ok"){
        window.location.href = './login.php';
    }
    
    return;
}

function nightMode(){
    let root = document.documentElement;

    root.style.setProperty('--primaryColor', "black");
    root.style.setProperty('--secondaryColor',  "white");
    root.style.setProperty('--invert',  "1");
}