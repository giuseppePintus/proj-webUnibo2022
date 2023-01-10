
function generateInfoUser(userInfo) {
    for (let i = 0; i < userInfo.length; i++) {
        let result = `
       
                <div class="userinfo searchPage">
                    <ul>
                        <li>
                            <form action="profile.php" method="post">
                            <input type="hidden" name="user" value="${userInfo[i]["userid"]}">
                            <button type="submit"><img src="${userInfo[i]["usericon"]}" alt="usericon" /></button>
                            </form>
                        </li>
                        <li>
                            <form action="profile.php" method="post">
                            <input type="hidden" name="user" value="${userInfo[i]["userid"]}">
                            <button type="submit">${userInfo[i]['usernickname']}</button>
                            </form>
                        </li>
                        <li>
                            <form action="profile.php" method="post">
                            <input type="hidden" name="user" value="${userInfo[i]["userid"]}">
                            <button type="submit">${userInfo[i]["username"]}</button>
                            </form>
                        </li>
                        <li id="follow${userInfo[i]["userid"]}" class="followButton"> 
                            <img  src="./upload/friend.png" alt="follow"/>
                            <p>${userInfo[i]["follow"]?"unfollow":"follow"}</p>
                        </li>
                    </ul>
                </div>
    
        `;// <li><p>${userInfo[i]["liked"]}</p></li>
        main.insertAdjacentHTML('beforeend', result);
        followInteractionsListeners(userInfo[i]["userid"]);
    }
    return;
}

async function followInteractionsListeners(idUserToFollow) {
    document.getElementById("follow" + idUserToFollow).addEventListener("click", () => {
        axios.post('./api-userFollow.php', {
            user: idUserToFollow
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'json',
            timeout: 5000
        }).then(response => {
            const p = document.querySelector('li#follow' + idUserToFollow + ' p');
            p.innerHTML = "" + response.data;
        });
    });
}

function searchFollow() {
    axios.post('./api-follower.php', {
        user: user,
        string: input.value,
        offset: offsetDB,
        size: sizeQRes,
        action
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        generateInfoUser(response.data);
        lock = true;
        offsetDB += sizeQRes;
    });
}



function addProfilePageListenrs() {
    document.getElementById('followingButton').addEventListener('click', () => {
        action = 0;
        cleanPosts();
        console.log("followingButton");
    });

    document.getElementById('followedButton').addEventListener('click', () => {
        action = 1;
        cleanPosts();
        console.log("followedButton");
    });
}

function cleanPosts() {
    offsetDB = 0;
    document.querySelectorAll(".userinfo").forEach(x => x.remove());
}

function addHeaders() {
    let header = `
    <div class="profilePosts">
                    <ul>
                        <li><button id="followedButton" type="button">who followed you</button></li>
                        <li><button id="followingButton" type="button">your followings</button></li>
                    </ul>
                </div>`;
    main.insertAdjacentHTML('afterbegin', header);
}


const main = document.querySelector("main");
const input = document.querySelector('#searchInfo');

let user = variable;
let offsetDB = 0;
let sizeQRes = 5;
let lock = true;

addHeaders();
addProfilePageListenrs();

input.addEventListener('input', function () {
    offsetDB = 0;
    cleanPosts();
    //searchFollow();  
});


window.addEventListener('scroll', () => {
    const lastChild = main.lastElementChild;
    const childCount = main.childElementCount;
    if (window.scrollY > main.offsetHeight - window.innerHeight  && lock) {
        if (offsetDB  === childCount) {
            lock = false;
            //searchFollow();
        }
    }
});