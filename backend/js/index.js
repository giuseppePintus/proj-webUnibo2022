/*retrieve posts from the database*/
const main = document.querySelector("main");
const mainInitialHtml = main.innerHTML;
let commentBoxStateMap = new Map();
let showNotification = 0;


async function getCommentsByPostId(postid) {
    const response = await axios.post('./api-getPostComments.php', {
        commentById: postid
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    });
    const commentList = response.data === undefined ? [] : response.data;
    return commentList;
}

async function generatePosts(posts) {
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
                    
                    <li><img id="like${posts[i]["postid"]}" class="posticon${posts[i]["liked"]}" src="./upload/like.png" alt="like"/></li>
                    <li><p>${posts[i]["liked"]}</p></li>
                    <li><img id="comment${posts[i]["postid"]}" src="./upload/comment.png" alt="comment"/></li>
                    <li><p>${posts[i]["commented"]}</p></li>
                    <li><img src="./upload/save.png" alt="save"/></li>
                    <li><p>${posts[i]["saved"]}</p></li>
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

function generateCommentsHTML(comments, postid) {
    let result = `<div class="writeCommentArea">
                    <input id="commentBox${postid}" type="text" placeholder="comment this post.." required>
                    <button id="commentButton${postid}" type="submit">comment</button>
                </div>`;

    for (let i = 0; i < comments.length; i++) {
        const commentHtml = `
        <div class="postComment">
            <ul>
                <li> <img src="${comments[i]["usericon"]}" alt="usericon" /></li>
                <li><h3>@${comments[i]["username"]}</h3> </li>
                <li><p>${comments[i]["commenttext"]}</p></li>
            </ul>
        </div>`;

        result += commentHtml;
    }

    return result;
}


async function getPageElements() {
    let postIds = [];
    try {
        const response = await axios.get('./api-post.php');
        main.innerHTML = mainInitialHtml + await generatePosts(response.data);
        response.data.forEach(element => postIds.push(element["postid"]));
    } catch (error) {
        console.error(error);
    }
    return postIds;
}

function sendNotification(message, who, how) {

    axios.post('./api-sendNotification.php', {
        notificationtext: message,
        fromwho : who,
        inWhichWay: how
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    }).then(response => {
        //console.log(response.data);
        generateNotifications();
    });
}

async function postInteractionsListeners(postIds, commentBoxStateMap) {
    /*Interaction with posts */
    postIds.forEach(postid => {
        /*like button listeners*/
        document.getElementById("like" + postid).addEventListener("click", () => {
            axios.post('./api-userLikedPost.php', {
                userLikedPostId: postid
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
                timeout: 5000
            }).then(response => {
                response.data[0]['likes'] ? sendNotification(' has unliked it', postid, 'like') : sendNotification(' has liked your post', postid, 'like');
                mainFunc();
            });
        });

        /*expand comment listeners*/
        document.getElementById("comment" + postid).addEventListener('click', async () => {
            await displayComment(postid, commentBoxStateMap.get(postid));
            commentBoxStateMap.set(postid, !commentBoxStateMap.get(postid))
            if (commentBoxStateMap.get(postid) != 0)
                commentButtonListenr(postid);

        });
    });/**end for each */

}

async function displayComment(postid, isVisible) {
    if (isVisible == 0) {
        let comments = await getCommentsByPostId(postid);
        document.getElementById("showComment" + postid).innerHTML
            = generateCommentsHTML(comments, postid);
    
    } else {
        document.getElementById("showComment" + postid).innerHTML = "";
       
    }

}

function commentButtonListenr(postid) {
    /*comment button listeners*/
    document.getElementById("commentButton" + postid).addEventListener('click', async () => {
        const commentTextBox = document.getElementById("commentBox" + postid);
        if (commentTextBox && commentTextBox.value) {
            axios.post('./api-userSendComment.php', {
                commentPostId: postid,
                commentText: commentTextBox.value
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json',
                timeout: 5000
            }).then(async () => {
                sendNotification(' has commented your post', postid, 'comment');
                mainFunc();
            });
        }
    });
}


async function mainFunc() {
    let postIds = await getPageElements();
    if (commentBoxStateMap.size === 0)
        commentBoxStateMap = new Map(postIds.map(key => [key, 0]));
    postInteractionsListeners(postIds, commentBoxStateMap);
}

/*main*/
mainFunc();


