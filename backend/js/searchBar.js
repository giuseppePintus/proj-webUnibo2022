function generateSearchResult(posts) {
  let result = "";
  for (let i = 0; i < posts.length; i++) {
      
      let article = `
      <div >
          <ul>
              <li> <img src="${posts[i]["usericon"]}" alt="usericon" /></li>
              <li><h2>${posts[i]['usernickname']}</h2></li>
              <li><h3>@${posts[i]["username"]}</h3> </li>
          </ul>
      </div>`;
      result += article;
  }
  return result;
}



const input = document.querySelector('#searchInfo');
const result = document.querySelector('.searchResult');
let offsetDB=0;
let sizeQRes=5;
input.addEventListener('input', function () {
  console.log('Input is being modified');
  if(input.value != null && input.value.length!=0){
    //axios call
    offsetDB=0;
    let queryUrl = './api-search.php?A='+offsetDB+'&B='+sizeQRes+'&S='+input.value;    
    axios.get(queryUrl).then(response => {
      let postshtml = generateSearchResult(response.data);
      console.log(response.data);
      result.innerHTML= postshtml;
    });
    console.log(queryUrl);
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

    console.log("  --------------------------------------");
    offsetDB+=sizeQRes;
    let queryUrl = './api-search.php?A='+offsetDB+'&B='+sizeQRes+'&S='+input.value;    
    axios.get(queryUrl).then(response => {
      let postshtml = generateSearchResult(response.data);
      console.log(response.data);
      result.insertAdjacentHTML('beforeend', postshtml);
    });
    console.log(queryUrl);
  }
});


input.addEventListener('click', function () {
  result.classList.add('open');
});

input.addEventListener('mouseleave', function () {
  //result.classList.add('closing'); setTimeout(() => this.classList.remove('open', 'closing'), 2000);
});

