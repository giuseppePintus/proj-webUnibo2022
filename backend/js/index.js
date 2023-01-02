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

async function getNotificationNumber() {
    const response = await axios.post('./api-readNotificationNumber.php', {
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
    });
    return response.data[0]['number'];
}

async function generateNotifications() {
    const notificationNumber = document.getElementById("notificationNumber");
    let notiNumber = await getNotificationNumber();
    if (notificationNumber != null) {
        notificationNumber.innerHTML = await getNotificationNumber();
    } else if (notiNumber > 0) {
        document.getElementById("notification-container").innerHTML = `
        <img id="notificationBellIcon" src="upload/notification.png" alt="notification">
        <div id="notificationNumber" class="notificationNumber"></div>`;
        generateNotifications();
    }
    if(!showNotification)
    return;
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
        notificationIds = new Array(notifications.length);
        for (let i = 0; i < notifications.length; i++) {
            notificationIds[i] = notifications[i]["notificationid"];
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

        notificationIds.forEach(element => {
            document.getElementById("notification" + element).addEventListener('click', event => {
                axios.post('./api-readNotification.php', {
                    notificationid: element
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    responseType: 'json',
                    timeout: 5000
                }).then(response => {
                    //notificationNumber.innerHTML = "";
                    if (response.data[0]["number"] > 0 && notificationNumber != null)
                        notificationNumber.innerHTML = response.data[0]["number"];
                    else {
                        document.getElementById("notification-container").innerHTML = `
                        <a href="#"><img src="upload/notification.png" alt="notification"></a>`;
                    }
                    generateNotifications();
                });
            });
        })
    });
}

function addNotificationBellListener(){
    document.getElementById("notificationBellIcon").addEventListener('click', event =>{
        if(showNotification){
            document.querySelector("aside").innerHTML = "";
            showNotification = 0;
            document.querySelector(".main").style.width = '100%'; 
        }else{
            document.querySelector(".main").style.width = '70%'; 
            showNotification = 1;
            generateNotifications();
        }
        //console.log(showNotification);
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
generateNotifications();
addNotificationBellListener();


