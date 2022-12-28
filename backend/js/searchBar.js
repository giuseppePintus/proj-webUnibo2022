/*const form = document.querySelector('#searchBar');
form.addEventListener('submit', function(event) {
  // prevent the form from being submitted
  event.preventDefault();

  // execute the code with Axios here
  const formData = new FormData(form);
  axios.post('/process-form.php', formData)
    .then(function (response) {
      // handle the response from the server
      //add popup to 
    })
    .catch(function (error) {
      // handle any errors
    });
  
});*/

function listResultSearch() {
  let searchRes =
  `<li>
      <ul>
        <li> <img src="./upload/icon.png" alt="" /></li>
        <li><h2>Giuseppe Pintus</h2></li>
        <li> <h3>@Giuppy</h3> </li>
        <li><p> - 28 Oct 2022</p></li>
      </ul>
    </li>`;

  return searchRes;
}


const input = document.querySelector('#searchInfo');
const result = document.querySelector('.searchResult');
let A=0;
let B=A+5;
input.addEventListener('input', function () {
  console.log('Input is being modified');
  //axios call
  let queryUrl = './api-search.php?A='+A+'&B='+B+'&S='+input.value;
  axios.get(queryUrl).then(response => {
    let postshtml = generatePosts(response.data);
    result.insertAdjacentHTML('beforeend', postshtml);
  });
  A+=5;
  B+=5;
  console.log(queryUrl);
  //result.insertAdjacentHTML('beforeend', listResultSearch());
});

input.addEventListener('click', function () {
  result.classList.add('open');
});

input.addEventListener('mouseleave', function () {
  //result.classList.add('closing'); setTimeout(() => this.classList.remove('open', 'closing'), 2000);
});

