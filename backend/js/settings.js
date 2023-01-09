async function logout(){
    const resp = await axios.post("./api-logOut.php");
    if(resp.data == "ok"){
        window.location.href = './login.php';
    }
    
    return;
}

function nightMode(){
    let root = document.documentElement;

    root.style.setProperty('--first-color', "black");
    root.style.setProperty('--second-color',  "white");
    root.style.setProperty('--invert',  "1");
}