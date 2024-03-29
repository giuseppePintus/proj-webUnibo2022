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
                <img src="${result['usericon']}" alt="usericon">
            </div>
        </header>
        <section>
            <div>
                <div>
                    <img src="${result['usericon']}" alt="usericon">
                    <ul>
                        <li><h2>${result['usernickname']}</h2></li>
                        <li>@${result["username"]}</li>
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
                    <li><button id="savedPostsButton" type="button">Saved Posts</button></li>

                </ul>
            </div>
            
            </section>
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
                        <button type="submit"><h2>${posts[i]['usernickname']}</h2></button>
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
                ${postimage}
                </div>
            </section>
            <footer>
                <ul>                    
                <li><img  class="like posticon${posts[i]["liked"]}" src="./upload/like.png" alt="like"/></li>
                <li><p class="nLike">${posts[i]["nlike"]}</p></li>
                <li><img class="comment" src="./upload/comment.png" alt="comment"/></li>
                <li><p class="nComment">${posts[i]["commented"]}</p></li>
                <li><img class="save posticon${posts[i]["saved"]}" src="./upload/save.png" alt="save"/></li>
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
                if (p !== null) {
                    p.value = '' + response.data;
                }
                /*Update followNumber state*/
                await refleshUserInfo();
                userInfo.then(result => {
                    document.querySelector('.followedNumber').innerHTML = result['followedNumber'] + ' followers';
                    document.querySelector('.followingNumber').innerHTML = result['followingNumber'] + ' following';
                });
            });
        });
    }
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

function addCurrentTagToButtons() {

    const myPost = document.getElementById('myPostsButton');
    const liked = document.getElementById('likedPostsButton');
    const commented = document.getElementById('CommentedPostsButton');
    const saved = document.getElementById('savedPostsButton');
    switch (postDisplaySelector) {
        case 0:
            myPost.classList.add('current');
            liked.classList.remove('current');
            commented.classList.remove('current');
            saved.classList.remove('current');
            break;
        case 1:
            liked.classList.add('current');
            myPost.classList.remove('current');
            commented.classList.remove('current');
            saved.classList.remove('current');
            break;
        case 2:
            commented.classList.add('current');
            myPost.classList.remove('current');
            liked.classList.remove('current');
            saved.classList.remove('current');
            break;
        case 3:
            saved.classList.add('current');
            myPost.classList.remove('current');
            liked.classList.remove('current');
            commented.classList.remove('current');
            break;
        default:
            break;
    }
}

function addProfilePageListenrs(userID) {
    document.getElementById('myPostsButton').addEventListener('click', () => {
        postDisplaySelector = 0;
        cleanPosts();
        userInitialPost(userID);
        addCurrentTagToButtons();
    });

    document.getElementById('likedPostsButton').addEventListener('click', () => {
        postDisplaySelector = 1;
        cleanPosts();
        userInitialPost(userID);
        addCurrentTagToButtons();
    });

    document.getElementById('CommentedPostsButton').addEventListener('click', () => {
        postDisplaySelector = 2;
        cleanPosts();
        userInitialPost(userID);
        addCurrentTagToButtons();
    });

    document.getElementById('savedPostsButton').addEventListener('click', () => {
        postDisplaySelector = 3;
        cleanPosts();
        userInitialPost(userID);
        addCurrentTagToButtons();
    });
}

function cleanPosts() {
    offsetUserPostQuery = 0;
    document.querySelectorAll(".homePost").forEach(x => x.remove());
}

function refleshPage() {
    profilePageTemplate(userInfo).then(result => {
        main.innerHTML = result;
        userInitialPost(user);
        addProfilePageListenrs(user);
        userScrollingPost(user);
        followInteractionsListeners(user);
        addCurrentTagToButtons();
    });
}

async function refleshUserInfo() {
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