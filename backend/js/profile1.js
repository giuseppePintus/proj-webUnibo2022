async function profilePageTemplate(userInfo) {
    if (userInfo === undefined) {
        return;
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
        
        <section class="profilePosts">
            <div>
                <ul>
                    <li><button id="myPostsButton" type="button">My Posts</button></li>
                    <li><button type="likedPostsButton">Liked Posts</button></li>
                    <li><button type="CommentedPostsButton">Commented Posts</button></li>
                </ul>
            </div>
        <section>
        </div>
        `;
        return html;
    });
    return resultHtml;
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

const mainNode = document.querySelector("main");

profilePageTemplate(getUserInfo()).then(result =>{
    mainNode.innerHTML = result;
});
