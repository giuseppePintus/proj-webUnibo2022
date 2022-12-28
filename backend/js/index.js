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


axios.get('./api-post.php').then(response => {
    console.log(response);
    let postshtml = generatePosts(response.data);
    const main = document.querySelector("main");
    main.innerHTML = postshtml;
});