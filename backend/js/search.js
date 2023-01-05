function generateInfoUser(userInfo) {
    let article = "";
    for (let i = 0; i < userInfo.length; i++) {
        let result = `
        <article >
            <header>
                <div class="postHeader">
                    <ul>
                        <li> <img src="${userInfo[i]["usericon"]}" alt="usericon" /></li>
                        <li> <h2>${userInfo[i]['usernickname']}</h2></li>
                        <li> <h3>@${userInfo[i]["username"]}</h3></li>
                        <li id="follow"><img  src="./upload/friend.png" alt="follow"/>
                        <p>follow</p></li>
                    </ul>
                </div>
            </header>
        </article>
        `;// <li><p>${posts[i]["liked"]}</p></li>
        article += result;
    }
    return article;
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
let sizeQRes = 2;



console.log(search);
console.log(input.value);
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
        let postshtml = generateInfoUser(response.data);
        main.innerHTML = postshtml;
    });


}
console.log(input.value);

input.addEventListener('input', function () {
    if (input.value != null && input.value.length != 0) {
        //axios call
        offsetDB = 0;
        randomOffsetDB = 0;
        axios.post('./api-search.php', {
            offset: offsetDB,
            size: sizeQRes,
            string: input.value
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            let postshtml = generateInfoUser(response.data);
            main.innerHTML = postshtml;
        });
    } else {
        main.innerHTML = "";
    }
});


window.addEventListener('scroll', () => {
    const lastChild = main.lastElementChild;
    const childCount = main.childElementCount;

    console.log("diff "+(main.offsetHeight - window.innerHeight));
    console.log("windows scroll y "+window.scrollY);

    //check if there cloud be more main based on last query and check scroll position
    //offsetDB + sizeQRes > childCount means there are no more result to query
    if ( offsetDB + sizeQRes +randomOffsetDB <= childCount  &&
        window.scrollY > main.offsetHeight - window.innerHeight) {
        offsetDB += sizeQRes;
        console.log("offsetDB "+offsetDB);
        axios.post('./api-search.php', {
            offset: offsetDB,
            size: sizeQRes,
            string: input.value
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            let postshtml = generateInfoUser(response.data);
            main.insertAdjacentHTML('beforeend', postshtml);
        });
    } else {
        if ( offsetDB + sizeQRes +randomOffsetDB <= childCount  &&
            window.scrollY > main.offsetHeight - window.innerHeight) {
            
            console.log("here");
            axios.post('./api-randomSearch.php', {
                offset: randomOffsetDB,
                size: sizeQRes
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                console.log("data");
                let postshtml = generateInfoUser(response.data);
                main.insertAdjacentHTML('beforeend', postshtml);
            });
            randomOffsetDB += sizeQRes;
        }
    }
});