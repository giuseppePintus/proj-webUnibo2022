
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

async function generatePosts(posts, showCommentBox) {
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
                        <li><h1>${posts[i]['usernickname']}</h1></li>
                        <li><h2>@${posts[i]["username"]}</h2> </li>
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
                    
                    <li><img id="like${posts[i]["postid"]}" src="./upload/like.png" alt="like"/></li>
                    <li><p>${posts[i]["liked"]}</p></li>
                    <li><img id="comment${posts[i]["postid"]}" src="./upload/comment.png" alt="comment"/></li>
                    <li><p>${posts[i]["commented"]}</p></li>
                    <li><img src="./upload/save.png" alt="save"/></li>
                    <li><p>${posts[i]["saved"]}</p></li>
                </ul>
            </footer>
        `;

        let comments = await getCommentsByPostId(posts[i]['postid']);
        article += generateCommentsHTML(comments, posts[i]['postid']);

        result += article;
        result += `</article>`;
    }

    return result;
}

function generateCommentsHTML(comments, postid) {
    let result = `<div class="writeCommentArea">
                    <input id="commentBox${postid}" type="text" placeholder="comment this post.." required>
                    <button id="commentButton${postid}" type="submit">send</button>
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

/*retrieve posts from the database*/
const main = document.querySelector("main");
const mainInitialHtml = main.innerHTML;

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

async function postInteractionsListeners(postIds) {
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
                mainFunc();
            });
        });
        /*comment button listeners*/
        document.getElementById("commentButton" + postid).addEventListener('click', () => {
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
                }).then(response => {
                    mainFunc();
                });
            }
        });
    });/**end for each */

}

function generateNotifications() {
    const aside = document.querySelector("aside");
    const asideInitialHTML = `<section>
    <header>
        <h1>Notification</h1>
    </header>`;

    axios.post('./api-getUserNotifications.php', {
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    }).then(response => {
        const notifications = response.data;
        let asideHTML = ``;
        for(let i = 0; i < notifications.length; i++){
            let notification = `
            <div id="notification${notifications[i]["notificationid"]}" class="notification${notifications[i]["alreadyread"]}">
            <ul>
                <li> <img src="${notifications[i]["usericon"]}" alt="usericon" /></li>
                <li>
                    <h3>${notifications[i]["usernickname"]}</h3>
                </li>
                <li>
                    <p>${notifications[i]["notificationtext"]}</p>
                </li>
            </ul>
            </div>
            `;
            asideHTML += notification;
        }
        aside.innerHTML = asideInitialHTML + asideHTML + `</section>`;
    });
}

async function mainFunc() {
    let postIds = await getPageElements();
    postInteractionsListeners(postIds);
}

/*main*/
mainFunc();
generateNotifications();
