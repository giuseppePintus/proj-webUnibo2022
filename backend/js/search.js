
function generateInfoUser(userInfo) {

    for (let i = 0; i < userInfo.length; i++) {
        let result = `
        <article >
            <header>
                <div class="userinfo">
                    <ul>
                        <li> <img src="${userInfo[i]["usericon"]}" alt="usericon" /></li>
                        <li> <h2>${userInfo[i]['usernickname']}</h2></li>
                        <li> <h3>@${userInfo[i]["username"]}</h3></li>
                        <li id="follow${userInfo[i]["userid"]}"><img  src="./upload/friend.png" alt="follow"/>
                        <p>follow</p></li>
                    </ul>
                </div>
            </header>
        </article>
        `;// <li><p>${posts[i]["liked"]}</p></li>
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

function randomUser() {
    axios.post('./api-randomSearch.php', {
        offset: randomOffsetDB,
        size: sizeQRes
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        generateInfoUser(response.data);
    });
    randomOffsetDB += sizeQRes;
    return;
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
        main.innerHTML = "";
        generateInfoUser(response.data);
    });
    offsetDB+=sizeQRes;
    return;
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
    randomUser();
}

input.addEventListener('input', function () {
    offsetDB = 0;
    randomOffsetDB = 0;
    main.innerHTML = "";
    if (input.value != null && input.value.length != 0) {
        //axios call
        searchUser();
    } else {        
        randomUser();
    }
});


window.addEventListener('scroll', () => {
    const lastChild = main.lastElementChild;
    const childCount = main.childElementCount;
    if (window.scrollY > main.offsetHeight - window.innerHeight) {
        if (offsetDB + randomOffsetDB === childCount) {
            if (randomOffsetDB === 0) {
                searchUser();
            }
            else {
                randomUser();
            }

        }
    }
});