

function generatePosts(posts) {
    let result = "";
    for (let i = 0; i < posts.length; i++) {
        let postiamge = "";
        if (posts[i]["postimage"] != null) {
            postiamge = "<img src=" + posts[i]["postimage"] + " alt=" + "postimage" + "/>";
        }
        let article = `
        <article id="${posts[i]["postid"]}" class="homePost">
            <header>
                <div class="postHeader">
                    <ul>
                        <li>
                            <form action="profile.php" method="post">
                            <input type="hidden" name="user" value="${posts[i]["userid"]}">
                            <button type="submit"><img src="${posts[i]["usericon"]}" alt="usericon" /></button>
                            </form>
                        </li>
                        <li>
                            <form action="profile.php" method="post">
                            <input type="hidden" name="user" value="${posts[i]["userid"]}">
                            <button type="submit">${posts[i]['usernickname']}</button>
                            </form>
                        </li>
                        <li>
                            <form action="profile.php" method="post">
                            <input type="hidden" name="user" value="${posts[i]["userid"]}">
                            <button type="submit">@${posts[i]["username"]}</button>
                            </form>
                        </li>
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
                    
                    <li><img  class="like posticon${posts[i]["liked"]}" src="./upload/like.png" alt="like"/></li>
                    <li><p class="nLike">${posts[i]["nlike"]}</p></li>
                    <li><img class="comment" src="./upload/comment.png" alt="comment"/></li>
                    <li><p class="nComment">${posts[i]["commented"]}</p></li>
                    <li><img class="save" src="./upload/save.png" alt="save"/></li>
                    <li><p class="nSave">${posts[i]["saved"]}</p></li>
                </ul>
            </footer>
        `;

        //let comments = await getCommentsByPostId(posts[i]['postid']);
        //article += generateCommentsHTML(comments, posts[i]['postid']);
        article += `<div id="showComment${posts[i]["postid"]}" class="showComment"></div>`;

        result += article;
        result += `</article>`;
    }
    return result;
}




function randomPost() {
    lock = false;
    axios.post('./api-randomPost.php', {
        offset: randomFeedHome,
        size: sizeOfUserFeedQuery
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        main.insertAdjacentHTML('beforeend', generatePosts(response.data));
        randomFeedHome += sizeOfUserFeedQuery;
        lock = true;
    });
}


function feedUserPost() {
    lock = false;
    axios.post('./api-homePost.php', {
        offset: userFeedHome,
        size: sizeOfUserFeedQuery,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        main.insertAdjacentHTML('beforeend', generatePosts(response.data));
        if (main.querySelectorAll('.homePost').length <= 2) {
            randomPost();
        }
        userFeedHome += sizeOfUserFeedQuery;
        lock = true;
    });
}

function userHome() {
}

function userScrollingHomePost() {
    window.addEventListener('scroll', () => {
        const childCount = main.querySelectorAll('.homePost').length;
        if (window.scrollY > main.offsetHeight - window.innerHeight && lock) {
            if (randomFeedHome === 0 && userFeedHome === childCount) {
                feedUserPost();
            }
            else {
                randomPost();
            }

        }
    });
}


// Get the current URL
let url = window.location.search;
// Create a new URLSearchParams object from the URL
let params = new URLSearchParams(url);
// Get the value of the "user" parameter
let user = params.get('user');

let main = document.querySelector("main");
const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');

let userFeedHome = 0;
let randomFeedHome = 0;
let sizeOfUserFeedQuery = 5;
let lock = true;
let userInfo;
axios.post('./api-getUser.php', {
    userID: user
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then((response) => {
    userInfo = response.data;
    user = userInfo["userid"];
    //userHome();//generate user info(?)
    feedUserPost();
    userScrollingHomePost();
});


