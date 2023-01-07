

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


const mainNode = document.querySelector("main");

mainNode.innerHTML =`
<div class="profileInfo">
<header>
    <div>
        <img src="upload/html5-js-css3.png" alt="userbackground">
    </div>
</header>
<section>
    <div>
        <img src="upload/giubby/icon.jpg" alt="usericon">
    </div>
    <ul>
        <li><h1>Giuseppe Pintus</h1></li>
        <li><h2>@Giubby</h2></li>
        <li><p>I will be the next president! sssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p></li>
    </ul>
    
    <ul class="followSection">
        <li><a href="#"><h3>30 followers<h3></a></li>
        <li><a href="#"><h3>30 following<h3></a></li>
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