//const main = document.querySelector("main").innerHTML = "";

function generatePostOfUser(posts, userInfo) {
    let result = "";
    for (let i = 0; i < posts.length; i++) {
        let postimage = "";
        if (posts[i]["postimage"] != null) {
            postimage = "<img src=" + posts[i]["postimage"] + " alt=" + "postimage" + "/>";
        }
        let article = `
        <article class="homePost">
            <header>
                <div class="postHeader">
                    <ul>
                        <li><a href="profile.php?user=${userInfo["username"]}"> <img src="${userInfo["usericon"]}" alt="usericon" /></a></li>
                        <li><a href="profile.php?user=${userInfo["username"]}"> <h2>${userInfo['usernickname']}</h2></a></li>
                        <li><a href="profile.php?user=${userInfo["username"]}"> <h3>@${userInfo["username"]}</h3> </a></li>
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
                   
                    <li><img id="like${posts[i]["postid"]}" src="./upload/like.png" alt="like"/></li>
                    <li><img src="./upload/comment.png" alt="comment"/></li>
                    <li><img src="./upload/save.png" alt="save"/></li>
                    <li><img src="./upload/send.png" alt="send"/></li>
                </ul>
            </footer>
        </article>
        `;// <li><p>${posts[i]["liked"]}</p></li>
        result += article;
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
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        userInfo = response.data;
    } catch (error) {
        console.error(error);
    }

    return userInfo;
}
function userInitialPost(){
    
    axios.post('./api-getUserPost.php', {
        offset: offsetDB,
        size: sizeQRes,
        user: user
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        let postshtml = generatePostOfUser(response.data, userInfo);
        main.insertAdjacentHTML('beforeend', postshtml);
    });
}
function userScrollingPost(){
window.addEventListener('scroll', () =>{
const childCount = main.childElementCount-1;
if(childCount >0 && offsetDB+sizeQRes<=childCount && 
    window.scrollY>main.offsetHeight-window.innerHeight){
    offsetDB+=sizeQRes;

    //POST
    axios.post('./api-getUserPost.php', {
        offset: offsetDB,
        size: sizeQRes,
        user: user
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(response => {
        console.log("offset "+offsetDB+" size "+sizeQRes+"  user "+user);
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

let userInfo;
let offsetDB = 0;
let sizeQRes = 5;
axios.post('./api-getUser.php', {
    userID: user
}, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then((response)=>{
    //post of user
    userInfo = response.data;
    userInitialPost();
    userScrollingPost();
});







