
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
                            <p>${userInfo[i]["follow"] ? "unfollow" : "follow"}</p>
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
    axios.post('./api-followList.php', {
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
    document.getElementById('followedButton').addEventListener('click', () => {
        action = 0;
        cleanPosts();
        searchFollow();
        document.querySelector("#followingButton").classList.remove("selected");
        document.querySelector("#followedButton").classList.add("selected");
    });

    document.getElementById('followingButton').addEventListener('click', () => {
        action = 1;
        cleanPosts();
        searchFollow();
        document.querySelector("#followedButton").classList.remove("selected");
        document.querySelector("#followingButton").classList.add("selected");
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
                        <li><button id="followedButton" type="button">follower</button></li>
                        <li><button id="followingButton" type="button">who is following</button></li>
                    </ul>
                </div>`;
    main.insertAdjacentHTML('afterbegin', header);
    switch (action) {
        case 0:
            document.querySelector("#followedButton").classList.add("selected");
            break;
        case 1:
            document.querySelector("#followingButton").classList.add("selected");
            break;
    }
}


const main = document.querySelector("main");
const input = document.querySelector('#searchInfo');

let user = variable;
let offsetDB = 0;
let sizeQRes = 10;
let lock = true;
addHeaders();
addProfilePageListenrs();
searchFollow();

input.addEventListener('input', function () {
    offsetDB = 0;
    cleanPosts();
    searchFollow();
});


window.addEventListener('scroll', () => {
    const lastChild = main.lastElementChild;
    const childCount = main.childElementCount;
    if (window.scrollY > main.offsetHeight - window.innerHeight && lock) {
        if (offsetDB === childCount) {
            lock = false;
            searchFollow();
        }
    }
});