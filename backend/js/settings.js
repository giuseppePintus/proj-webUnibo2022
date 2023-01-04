window.onload = getData();



async function getData(){

    //eseguo richiesta dati a php
    const result = await axios.post('./api-getCurrentUserInfo.php');
    console.log(result.data);
    let data = result.data;
    //result.data array
    //0: useremail 
    //1: username
    //2: usernickname
    //3: usericon
    //4: userbiography
    
    //aggiungo dati alla pagina
    let div = document.getElementById("AccountInfo");
        let userData = `    
                        <ul>
                            <li>
                                 <p> email: ${data[0]}</p>
                            </li>
                            <li>
                                <p> nome utente: ${data[1]}</p>
                            </li>
                            <li>
                                <p> nickname: ${data[2]}</p>
                            </li>
                            <li> 
                                <p> Immagine profilo </p>
                                <img src="${data[3]}" alt="usericon" />
                            </li>
                            
                            <li>
                                <p>biografia:${data[4]} </p>
                            </li>
                        </ul>
                        `;
    div.innerHTML= userData;

}
