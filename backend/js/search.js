
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


function getUser() {
    axios.post('./api-randomSearch.php', {
        offset: randomOffsetDB,
        size: sizeQRes,
        userDisplaySelector : userDisplaySelector
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        console.log(response.data);
        generateInfoUser(response.data);
        lock = true;
        randomOffsetDB += sizeQRes;
    });
}


function searchUser() {
    axios.post('./api-search.php', {
        offset: offsetDB,
        size: sizeQRes,
        string: input.value
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        generateInfoUser(response.data);
        lock = true;
        offsetDB+=sizeQRes;
    });
}

function addProfilePageListenrs() {
    document.getElementById('randomButton').addEventListener('click', () => {
        userDisplaySelector = 0;
        cleanPosts();
        getUser();
    });

    document.getElementById('followedButton').addEventListener('click', () => {
        userDisplaySelector = 1;
        cleanPosts();
        getUser();
    });

    document.getElementById('followingButton').addEventListener('click', () => {
        userDisplaySelector = 2;
        cleanPosts();
        getUser();
    });
}

function cleanPosts() {
    offsetUserPostQuery = 0;
    document.querySelectorAll(".userinfoSearchPage").forEach(x => x.remove());
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
const input = document.querySelector('#searchInfo');

let offsetDB = 0, randomOffsetDB = 0;
let sizeQRes = 5;
let lock = true;
let userDisplaySelector = 0; // 0 random users, 1 followed users, 2 following users

main.innerHTML = `
<div class="profilePosts">
                <ul>
                    <li><button id="randomButton" type="button">you may be interested</button></li>
                    <li><button id="followedButton" type="button">who followed you</button></li>
                    <li><button id="followingButton" type="button">your followings</button></li>
                </ul>
            </div>`;

addProfilePageListenrs();

if (search != null) {
    input.value = search;
    axios.post('./api-search.php', {
        offset: offsetDB,
        size: sizeQRes,
        string: input.value
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        generateInfoUser(response.data);
    });
}
else {
    getUser();
}

input.addEventListener('input', function () {
    offsetDB = 0;
    randomOffsetDB = 0;
    main.innerHTML = "";
    if (input.value != null && input.value.length != 0) {
        //axios call
        searchUser();
    }
});


window.addEventListener('scroll', () => {
    const lastChild = main.lastElementChild;
    const childCount = main.childElementCount;
    if (window.scrollY > main.offsetHeight - window.innerHeight  && lock) {
        if (offsetDB + randomOffsetDB === childCount) {
            lock = false;
            if (randomOffsetDB === 0) {
                searchUser();
            }
            else {
                getUser();
            }

        }
    }
});