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

function getExamplepost() {
    let article = `
    <div class="searchPopup">
        <ul>
            <li> <img src="./upload/icon.png" alt="" /></li>
            <li><h2>Giuseppe Pintus</h2></li>
            <li> <h3>@Giuppy</h3> </li>
            <li><p> - 28 Oct 2022</p></li>
        </ul>
  </div>`;
    return article;
}


const input = document.querySelector('#searchInfo');
const result = document.querySelector('.searchResult');

input.addEventListener('input', function() {
  console.log('Input is being modified');
  result.insertAdjacentHTML('beforeend', getExamplepost());
});

input.addEventListener('click', function() {
    result.classList.add('open');
});

input.addEventListener('mouseleave', function() {
    //result.classList.add('closing'); setTimeout(() => this.classList.remove('open', 'closing'), 2000);
});

