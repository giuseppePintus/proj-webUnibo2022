function likeAction(postid) {

  axios.post('./api-userLikedPost.php', {
    userLikedPostId: postid
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json',
    timeout: 5000
  }).then(response => {
    response.data[0]['likes'] ? sendNotification(' has unliked it', postid, 'like') : sendNotification(' has liked your post', postid, 'like');
    let tagElement = document.getElementById(postid);
    let likeElement= tagElement.querySelector('.like');
    let newState= response.data[0]['likes'] ?'0' : '1';
    
    likeElement.classList.remove('posticon'+response.data[0]['likes']);
    likeElement.classList.add('posticon'+newState);
    /* 
    refreshPost(postid);
 */

  });
}










// Add a click event listener to the body element
document.body.addEventListener('click', function (event) {
  // Check if the clicked element is a .homepost element


  let article = event.target.closest('.homePost');

  // Check if the clicked element is a li element
  if (article) {
    let postID = article.id;
    if (event.target.classList.contains('like')) {
      // If it is, do something
      console.log('like post');
      likeAction(postID);
    }
    if (event.target.classList.contains('comment')) {
      // If it is, do something
      console.log('comment post');
    }
    if (event.target.classList.contains('save')) {
      // If it is, do something
      console.log('save post');
    }
  }

});







