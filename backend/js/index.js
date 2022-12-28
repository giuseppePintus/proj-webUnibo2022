function generatePosts(posts) {
    let result = "";
    for (let i = 0; i < posts.length; i++) {
        let postiamge = "";
        if(posts[i]["postimage"] != null){
            postiamge = "<img src=" + posts[i]["postimage"] + " alt=" + "postimage" + "/>";
        }
        let article = `
        <article>
            <header>
                <ul>
                    <li> <img src="${posts[i]["usericon"]}" alt="usericon" /></li>
                    <li><h2>${posts[i]['usernickname']}</h2></li>
                    <li> <h3>@${posts[i]["username"]}</h3> </li>
                    <li><p> - ${posts[i]["postdate"]}</p></li>
                </ul>
            </header>
            <section>
                <p>${posts[i]["posttext"]}</p>
                <div class="postimage">
                ${postiamge}
                </div>
            </section>
            <footer>
                <ul>
                    <li><p>235,232</p></li>
                    <li><a href="#"><img src="./upload/like.png" alt="like"/></a></li>
                    <li><a href="#"><img src="./upload/comment.png" alt="comment"/></a></li>
                    <li><a href="#"><img src="./upload/save.png" alt="save"/></a></li>
                    <li><a href="#"><img src="./upload/send.png" alt="send"/></a></li>
                </ul>
            </footer>
        </article>
        `;
        result += article;
    }
    return result;
}




function getExamplepost() {
    let article = `<article>
    <header>
        <ul>
            <li> <img src="./upload/icon.png" alt="" /></li>
            <li><h2>Giuseppe Pintus</h2></li>
            <li> <h3>@Giuppy</h3> </li>
            <li><p> - 28 Oct 2022</p></li>
        </ul>
    </header>
    <section>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
        <div>
        <img src="./upload/html5-js-css3.png" alt="" />
        </div>
    </section>
    <footer>
        <ul>
            <li><p>235,232</p></li>
            <li><a href="#"><img src="./upload/like.png" alt="like"/></a></li>
            <li><a href="#"><img src="./upload/comment.png" alt="comment"/></a></li>
            <li><a href="#"><img src="./upload/save.png" alt="save"/></a></li>
            <li><a href="#"><img src="./upload/send.png" alt="send"/></a></li>
        </ul>
    </footer>
</article>
<article>
    <header>
        <div>
            <img src="./upload/php.png" alt="" />
        </div>
        <h2>Intro alle Tecnologie Web Server Side</h2>
        <p>28 Ottobre 2022 - Cippa Lippa</p>
    </header>
    <section>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </section>
    <footer>
        <a href="#">Leggi tutto</a>
    </footer>
</article>`;
    return article;
}
function getPost(A,B){
    //interi dell'intervallo dei post A e B
    
}

const main = document.querySelector("main");
axios.get('./api-post.php').then(response => {
    let postshtml = generatePosts(response.data);
    main.insertAdjacentHTML('beforeend', postshtml);
});
axios.get('./api-post.php').then(response => {
    let postshtml = generatePosts(response.data);
    main.insertAdjacentHTML('beforeend', postshtml);
});

//const main = document.querySelector("main");
window.addEventListener('scroll', () =>{
    let lastChild = main.lastElementChild;
    //if ( main.offsetHeight >= lastChild.offsetTop - lastChild.offsetHeight) {
        if(window.scrollY>main.offsetHeight-window.innerHeight){

        // The last child element is currently visible
        axios.get('./api-post.php').then(response => {
            let postshtml = generatePosts(response.data);
            //main.insertAdjacentHTML('beforeend', postshtml);
        });

        //lastChild = main.lastElementChild;
    }
});


