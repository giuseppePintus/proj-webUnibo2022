//const main = document.querySelector("main").innerHTML = "";

function generatePostOfUser(posts, userInfo) {
    let result = "";
    for (let i = 0; i < posts.length; i++) {
        let postimage = "";
        if (posts[i]["postimage"] != null) {
            postimage = "<img src=" + posts[i]["postimage"] + " alt=" + "postimage" + "/>";
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
                ${postimage}
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

function generateInfoUser(userInfo) {
    let fol = ``;
    if (user != null) {
        fol = '<li id="follow"><img  src="./upload/friend.png" alt="follow"/><p>follow</p></li>';
    }
    let result = `        
        <div >
            <ul>
                <li> <img src="${userInfo["usericon"]}" alt="usericon" /></li>
                <li> <h2>${userInfo['usernickname']}</h2></li>
                <li> <h3>@${userInfo["username"]}</h3></li>
                ${fol} 
            </ul>
        </div>
        `;// <li><p>${posts[i]["liked"]}</p></li>

    return result;
}




async function getUserInfo(user) {
    let userInfo;
    try {
        let response = await axios.post('./api-getUser.php', {
            userID: user
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        userInfo = response.data;
    } catch (error) {
        console.error(error);
    }

    return userInfo;
}
function userInitialPost(userID) {
    let postshtml = generateInfoUser(userInfo);
    main.insertAdjacentHTML('afterbegin', postshtml);


    axios.post('./api-getUserPost.php', {
        offset: offsetUserPostQuery,
        size: sizeUserPostQueryResult,
        user: userID
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        postshtml = generatePostOfUser(response.data, userInfo);
        main.insertAdjacentHTML('beforeend', postshtml);
        offsetUserPostQuery += sizeUserPostQueryResult;

        if(user != null){
            followInteractionsListeners(userID);
        }
    });
}

async function followInteractionsListeners(userID) {
    document.getElementById("follow").addEventListener("click", () => {
        axios.post('./api-userFollow.php', {
            user: userID
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            timeout: 5000
        }).then(response => {
            const p = document.querySelector('li#follow p');
            p.innerHTML = "" + response.data;
        });
    });
}



function userPost(userID) {

    lock = false;
    //POST
    axios.post('./api-getUserPost.php', {
        offset: offsetUserPostQuery,
        size: sizeUserPostQueryResult,
        user: userID
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        let postshtml = generatePostOfUser(response.data, userInfo);
        main.insertAdjacentHTML('beforeend', postshtml);
        offsetUserPostQuery += sizeUserPostQueryResult;
        lock = true;
    });
}











function userScrollingPost(userID) {
    window.addEventListener('scroll', () => {
        const childCount = main.querySelectorAll('.homePost').length;
        if (window.scrollY > main.offsetHeight - window.innerHeight && lock) {
            userPost(userID);
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


let offsetUserPostQuery = 0;
let sizeUserPostQueryResult = 5;
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
    userInitialPost(userInfo["userid"]);
    userScrollingPost(userInfo["userid"]);
});






