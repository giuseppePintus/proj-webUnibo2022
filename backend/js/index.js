

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
                        <li><a href="profile.php?user=${posts[i]["username"]}"> <img src="${posts[i]["usericon"]}" alt="usericon" /></a></li>
                        <li><a href="profile.php?user=${posts[i]["username"]}"> <h2>${posts[i]['usernickname']}</h2></a></li>
                        <li><a href="profile.php?user=${posts[i]["username"]}"> <h3>@${posts[i]["username"]}</h3> </a></li>
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
                    <li><p class="nLike">${posts[i]["liked"]}</p></li>
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
    axios.post('./api-randomPost.php', {
        offset: randomoffsetUserPostQuery,
        size: sizeUserPostQueryResult
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        main.insertAdjacentHTML('beforeend', generatePosts(response.data));
    });
    randomoffsetUserPostQuery += sizeUserPostQueryResult;
    return;
}


function feedUserPost() {
    console.log("here");
    console.log("offsetUserPostQuery :"+offsetUserPostQuery);
    console.log("sizeUserPostQueryResult :"+sizeUserPostQueryResult);
    axios.post('./api-homePost.php', {
        offset: offsetUserPostQuery,
        size: sizeUserPostQueryResult,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        main.insertAdjacentHTML('beforeend', generatePosts(response.data));
        //console.log(response.data);
    });
    offsetUserPostQuery+=sizeUserPostQueryResult;
    return;
}

function userHome() {
}

function userScrollingHomePost() {
    window.addEventListener('scroll', () => {
        const childCount = main.querySelectorAll('.homePost').length;
        if (window.scrollY > main.offsetHeight - window.innerHeight) {
            if (offsetUserPostQuery + randomoffsetUserPostQuery >= childCount) {
                if (randomoffsetUserPostQuery === 0) {
                    feedUserPost();
                }
                else {
                    randomPost();
                }
    
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

const main = document.querySelector("main");
const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get('search');

let offsetUserPostQuery = 0;
let randomoffsetUserPostQuery= 0;
let sizeUserPostQueryResult = 5;
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
    if(main.querySelectorAll('.homePost').length<=2){
        randomPost();
    }
    userScrollingHomePost();
}); 

