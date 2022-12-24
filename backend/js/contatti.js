function stringaToID(stringa){
    return stringa.toLowerCase().replace(/[^a-zA-Z]/g, "");
}

function generaTabella(autori){
    
    let table = `
    <section>
        <h2>Autori del Blog</h2>
        <table>
            <tr>
                <th id="autore">Autore</th><th id="email">Email</th><th id="argomenti">Argomenti</th>
            </tr>`;
    
    for(let i = 0; i < autori.length; i++){
        let row_id = stringaToID(autori[i]["nome"]);
        table +=  `
        <tr>
            <th id="${row_id}">${autori[i]["nome"]}</th> 
            <td headers="${row_id} email">${autori[i]["username"]}</td>
            <td headers="${row_id} argomenti">${autori[i]["argomenti"]}</td>
        </tr>`
    }

    table +=  `
        </table>
    </section>`;

    return table;
}

axios.get('api-contatti.php').then(response => {
    console.log(response);
    let tabella = generaTabella(response.data);
    const main = document.querySelector("main");
    main.innerHTML = tabella;
});
