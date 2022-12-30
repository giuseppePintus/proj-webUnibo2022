function generateSearchResult(posts) {
  let result = "";
  for (let i = 0; i < posts.length; i++) {
      
      let article = `
      <a href="profile.php?user=${posts[i]["userid"]}">
        <div >
            <ul>
                <li> <img src="${posts[i]["usericon"]}" alt="usericon" /></li>
                <li><h2>${posts[i]['usernickname']}</h2></li>
                <li><h3>@${posts[i]["username"]}</h3> </li>
            </ul>
        </div>
      </a>`;
      result += article;
  }
  return result;
}



const input = document.querySelector('#searchInfo');
const result = document.querySelector('.searchResult');
let offsetDB=0;
let sizeQRes=2;


input.addEventListener('input', function () {
  if(input.value != null && input.value.length!=0){
    //axios call
    offsetDB=0;
    axios.post('./api-search.php', {
      offset: offsetDB,
      size: sizeQRes,
      string: input.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      let postshtml = generateSearchResult(response.data);
      result.innerHTML = postshtml;
    });
  }else{
    result.innerHTML="";
  }
});


result.addEventListener('scroll', () =>{
  const lastChild = result.lastElementChild;
  const childCount = result.childElementCount;

  //check if there cloud be more result based on last query and check scroll position
  if(childCount >0 && offsetDB+sizeQRes<=childCount &&
    result.offsetHeight+result.scrollTop>result.scrollHeight-lastChild.offsetHeight){
    offsetDB+=sizeQRes;
    axios.post('./api-search.php', {
      offset: offsetDB,
      size: sizeQRes,
      string: input.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      let postshtml = generateSearchResult(response.data);
      result.innerHTML += postshtml;
    });
  }
});


input.addEventListener('click', function () {
  result.classList.add('open');
});

input.addEventListener('mouseleave', function () {
  //result.classList.add('closing'); setTimeout(() => this.classList.remove('open', 'closing'), 2000);
});

