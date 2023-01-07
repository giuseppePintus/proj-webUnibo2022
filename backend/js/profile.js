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
function userInitialPost() {
    let postshtml = generateInfoUser(userInfo);
        main.insertAdjacentHTML('afterbegin', postshtml);
    console.log("ok");
    axios.post('./api-getUserPost.php', {
        offset: offsetUserPostQuery,
        size: sizeUserPostQueryResult,
        user: user
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        
        if (user != null) {
            followInteractionsListeners(userInfo["userid"]);
        }
        postshtml = generatePostOfUser(response.data, userInfo);
        main.insertAdjacentHTML('beforeend', postshtml);
        console.log(postshtml);
    });
}

async function followInteractionsListeners(idUserToFollow) {
    document.getElementById("follow").addEventListener("click", () => {
        axios.post('./api-userFollow.php', {
            user: idUserToFollow
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















function userScrollingPost() {
    window.addEventListener('scroll', () => {
        const childCount = main.childElementCount - 1;
        if (childCount > 0 && offsetUserPostQuery + sizeUserPostQueryResult <= childCount &&
            window.scrollY > main.offsetHeight - window.innerHeight) {
            offsetUserPostQuery += sizeUserPostQueryResult;

            //POST
            axios.post('./api-getUserPost.php', {
                offset: offsetUserPostQuery,
                size: sizeUserPostQueryResult,
                user: user
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                console.log("offset " + offsetUserPostQuery + " size " + sizeUserPostQueryResult + "  user " + user);
                let postshtml = generatePostOfUser(response.data, userInfo);
                main.insertAdjacentHTML('beforeend', postshtml);
            });


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
    userInitialPost();
    userScrollingPost();
});






