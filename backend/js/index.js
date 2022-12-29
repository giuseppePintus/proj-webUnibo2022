function generatePosts(posts) {
    let result = "";
    for (let i = 0; i < posts.length; i++) {
        let postiamge = "";
        if (posts[i]["postimage"] != null) {
            postiamge = "<img src=" + posts[i]["postimage"] + " alt=" + "postimage" + "/>";
        }
        let article = `
        <article class="homePost">
            <header>
                <div class="postHeader">
                    <ul>
                        <li> <img src="${posts[i]["usericon"]}" alt="usericon" /></li>
                        <li><h2>${posts[i]['usernickname']}</h2></li>
                        <li><h3>@${posts[i]["username"]}</h3> </li>
                        <li><p> - ${posts[i]["postdate"]}</p></li>
                    </ul>
                </div>
            </header>
            <section>
                <p>${posts[i]["posttext"]}</p>
                <div class="postimage">
                ${postiamge}
                </div>
            </section>
            <footer>
                <ul>
                    <li><p>${posts[i]["liked"]}</p></li>
                    <li><img id="like${posts[i]["postid"]}" src="./upload/like.png" alt="like"/></li>
                    <li><img src="./upload/comment.png" alt="comment"/></li>
                    <li><img src="./upload/save.png" alt="save"/></li>
                    <li><img src="./upload/send.png" alt="send"/></li>
                </ul>
            </footer>
        </article>
        `;
        result += article;
    }
    return result;
}

/*retrieve posts from the database*/
const main = document.querySelector("main");
const mainInitialHtml = main.innerHTML;

async function getPageElements(){
    let postIds = [];
    try {
        const response = await axios.get('./api-post.php');
        main.innerHTML = mainInitialHtml + generatePosts(response.data);
        response.data.forEach(element => postIds.push(element["postid"]));
    } catch (error) {
        console.error(error);
    }
    return postIds;
}

async function postInteractionsListeners(postIds) {
    /*Interaction with posts */
    postIds.forEach(postid => {
        document.getElementById("like" + postid).addEventListener("click", () => {
            axios.post('./api-userLikedPost.php', {
                userLikedPostId: postid
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
                timeout: 5000
            }).then(response =>{
                mainFunc();
            });
        });
    });

}

async function mainFunc(){
    let postIds = await getPageElements();
    postInteractionsListeners(postIds);
}

/*main*/
mainFunc();