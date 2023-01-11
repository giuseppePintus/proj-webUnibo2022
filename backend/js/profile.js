async function profilePageTemplate(userInfo) {
    if (userInfo === undefined) {
        return;
    }
    let resultHtml = await userInfo.then(result => {
        let fol = '';
        if ("follow" in result) {
            fol = '<input type="submit" id="follow" ';
            if (result["follow"]) {//<img  src="./upload/friend.png" alt="follow"/> follow
                fol += 'value="unfollow"';
            }
            else {
                fol += 'value="follow"';
            }
            fol += '/>';
        } else {
            fol = `<form action="editProfile.php" method="get">
            <input type="submit" value="Edit Profile" id="editprofile">
                </form>`;
        }
        let html = `
        <div class="profileInfo">
        <header>
            <div>
                <img src="upload/html5-js-css3.png" alt="userbackground">
            </div>
        </header>
        <section>
            <div>
                <div>
                    <img src="${result['usericon']}" alt="usericon">
                    <ul>
                        <li><h1>${result['usernickname']}</h1></li>
                        <li><h2>@${result["username"]}</h2></li>
                    </ul>
                </div>
                <p>Bio: ${result["userbiography"]}</p>
                <ul class="followSection">
                    <li>
                        <form action="follower.php" method="post">
                        <input type="hidden" name="user" value="${result["userid"]}">
                        <input type="hidden" name="action" value="0">
                        <button class="followedNumber" type="submit">${result['followedNumber']} followers</button>
                        </form>
                    </li>
                    <li>
                        <form action="follower.php" method="post">
                        <input type="hidden" name="user" value="${result["userid"]}">
                        <input type="hidden" name="action" value="1">
                        <button class="followingNumber" type="submit">${result['followingNumber']} following</button>
                        </form>
                    </li>
                    
                    <li>
                        ${fol}
                    </li>
                </ul>
            </div>
            <div id="profilePosts" class="profilePosts">
                <ul>
                    <li><button id="myPostsButton" type="button">My Posts</button></li>
                    <li><button id="likedPostsButton" type="button">Liked Posts</button></li>
                    <li><button id="CommentedPostsButton" type="button">Commented Posts</button></li>
                </ul>
            </div>
            
            </section>
        </div>

        <div id="profilePostArea">
        </div>
        `;
        return html;
    });
    return resultHtml;
}

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
                        <button type="submit">${posts[i]["username"]}</button>
                        </form>
                    </li>
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
                    <li><p class="nLike">${posts[i]["nlike"]}</p></li>
                    <li><img class="comment" src="./upload/comment.png" alt="comment"/></li>
                    <li><p class="nComment">${posts[i]["commented"]}</p></li>
                    <li><img class="save" src="./upload/save.png" alt="save"/></li>
                    <li><p class="nSave">${posts[i]["saved"]}</p></li>
                </ul>
            </footer>
        `;
        article += `<div id="showComment${posts[i]["postid"]}" class="showComment"></div>`;

        result += article;
        result += `</article>`;
    }
    return result;
}

async function getUserInfo(userID) {
    let userInfo;
    try {
        let response = await axios.post('./api-getUser.php', {
            user: userID
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            timeout: 5000
        });
        userInfo = response.data;
    } catch (error) {
        console.error(error);
    }
    return userInfo;
}

function userInitialPost(userID) {
    lock = false;

    axios.post('./api-getUserPost.php', {
        offset: offsetUserPostQuery,
        size: sizeUserPostQueryResult,
        display: postDisplaySelector,
        user: userID
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        //profilePageTemplate(userInfo);//(?)
        postshtml = generatePostOfUser(response.data, userInfo);
        main.insertAdjacentHTML('beforeend', postshtml);
        offsetUserPostQuery += sizeUserPostQueryResult;
        lock = true;
    });
}

async function followInteractionsListeners(userID) {
    if (document.getElementById("follow") != null) {
        document.getElementById("follow").addEventListener("click", () => {
            axios.post('./api-userFollow.php', {
                user: userID
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
                timeout: 5000
            }).then(async response => {
                if (response.data == "unfollow") {
                    sendNotification(' has started following you!', userID, 'follow');
                } else if (response.data == "follow") {
                    sendNotification(' has unfollowed you!', userID, 'follow');
                }
                const p = document.getElementById('follow');
                if(p !== null){
                    p.value = '' + response.data;
                }
                /*Update followNumber state*/
                await refleshUserInfo();
                userInfo.then(result =>{
                    document.querySelector('.followedNumber').innerHTML = result['followedNumber'] + ' followers';
                    document.querySelector('.followingNumber').innerHTML = result['followingNumber'] + ' following';
                });
            });
        });
    }
}

function getFollowerNumber(){
    
}



function userPost(userID) {

    lock = false;

    axios.post('./api-getUserPost.php', {
        offset: offsetUserPostQuery,
        size: sizeUserPostQueryResult,
        display: postDisplaySelector,
        user: userID
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        postshtml = generatePostOfUser(response.data, userInfo);
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
function addProfilePageListenrs(userID) {
    document.getElementById('myPostsButton').addEventListener('click', (aa) => {
        postDisplaySelector = 0;
        cleanPosts();
        userInitialPost(userID);
    });

    document.getElementById('likedPostsButton').addEventListener('click', () => {
        postDisplaySelector = 1;
        cleanPosts();
        userInitialPost(userID);
    });

    document.getElementById('CommentedPostsButton').addEventListener('click', () => {
        postDisplaySelector = 2;
        cleanPosts();
        userInitialPost(userID);
    });
}

function cleanPosts() {
    offsetUserPostQuery = 0;
    document.querySelectorAll(".homePost").forEach(x => x.remove());
}


function refleshPage(){
    profilePageTemplate(userInfo).then(result => {
        main.innerHTML = result;
        userInitialPost(user);
        addProfilePageListenrs(user);
        userScrollingPost(user);
        followInteractionsListeners(user);
    });
    
}

async function refleshUserInfo(){
    userInfo = getUserInfo(user).then(result => {
        user = result["userid"];
        return result;
    });
}

const main = document.querySelector("main");

let user = variable;
let offsetUserPostQuery = 0;
let sizeUserPostQueryResult = 5;
let lock = true;
let userInfo;
let postDisplaySelector = 0; // 0 my posts, 1 liked posts, 2 commented posts

/*get user passed in the url*/

refleshUserInfo(); 
refleshPage();