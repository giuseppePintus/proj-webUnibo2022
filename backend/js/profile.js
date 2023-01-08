async function profilePageTemplate(userInfo) {
    if (userInfo === undefined) {
        return;
    }
    let fol = ``;
    if (params.get('user') != null) {//<img  src="./upload/friend.png" alt="follow"/>
        fol = '<li id="follow"><p>follow</p></li>';
    }
    let resultHtml = await userInfo.then(result => {
        let html = `
        <div class="profileInfo">
        <header>
            <div>
                <img src="upload/html5-js-css3.png" alt="userbackground">
            </div>
        </header>
        <section>
            <div>
                <img src="${result['usericon']}" alt="usericon">
            </div>
            <ul>
                <li><h1>${result['usernickname']}</h1></li>
                <li><h2>@${result["username"]}</h2></li>
                <li><p>Bio: ${result["userbiography"]}</p></li>
            </ul>
            
            <ul class="followSection">
                <li><a href="search.php"><h3>${result['followedNumber']} followers<h3></a></li>
                <li><a href="search.php"><h3>${result['followingNumber']} following<h3></a></li>
                <li><button type="button" id="editprofile">Edit Profile</li>
            </ul>
        </section>
        
        <section id="profilePosts" class="profilePosts">
            <div>
                <ul>
                    <li><button id="myPostsButton" type="button">My Posts</button></li>
                    <li><button id="likedPostsButton" type="button">Liked Posts</button></li>
                    <li><button id="CommentedPostsButton" type="button">Commented Posts</button></li>
                    ${fol}
                </ul>
            </div>
        <section>
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
        article += `<div id="showComment${posts[i]["postid"]}" class="showComment"></div>`;

        result += article;
        result += `</article>`;
    }
    return result;
}

async function getUserInfo(user) {
    let userInfo;
    try {
        let response = await axios.post('./api-getUser.php', {
            userID: user
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

        if(params.get('user') != null){
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
function addProfilePageListenrs(userID){
    document.getElementById('myPostsButton').addEventListener('click', (aa)=>{
        postDisplaySelector = 0;
        cleanPosts();
        userInitialPost(userID);
    });

    document.getElementById('likedPostsButton').addEventListener('click', ()=>{
        postDisplaySelector = 1;
        cleanPosts();
        userInitialPost(userID);
    });

    document.getElementById('CommentedPostsButton').addEventListener('click', ()=>{
        postDisplaySelector = 2;
        cleanPosts();
        userInitialPost(userID);
    });
}

function cleanPosts(){
    offsetUserPostQuery = 0;
    document.querySelectorAll(".homePost").forEach(x => x.remove());
}

const mainNode = document.querySelector("main");
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

let postDisplaySelector = 0; // 0 my posts, 1 liked posts, 2 commented posts

/*get user passed in the url*/
userInfo = getUserInfo(user).then(result => {
    user = result["userid"];
    return result;
});
profilePageTemplate(userInfo).then(result => {
    mainNode.innerHTML = result;
    userInitialPost(user);
    addProfilePageListenrs(user);   
    userScrollingPost(user);
    //followInteractionsListeners();
});
