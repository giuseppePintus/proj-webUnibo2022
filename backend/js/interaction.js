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
    let likeElement = tagElement.querySelector('.like');
    let newState = response.data[0]['likes'] ? '0' : '1';

    likeElement.classList.remove('posticon' + response.data[0]['likes']);
    likeElement.classList.add('posticon' + newState);
    refreshPost(postid);
  });
}

async function showComment(postid) {
  commentBoxStateMap.set(postid, !commentBoxStateMap.get(postid));

  await displayComment(postid, commentBoxStateMap.get(postid));
  if (commentBoxStateMap.get(postid)) {
    commentButtonListenr(postid);
  }
}

function commentButtonListenr(postid) {
  /*comment button listeners*/
  document.getElementById("commentButton" + postid).addEventListener('click', async () => {
    const commentTextBox = document.getElementById("commentBox" + postid);
    if (commentTextBox && commentTextBox.value) {
      axios.post('./api-userSendComment.php', {
        commentPostId: postid,
        commentText: commentTextBox.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType: 'json',
        timeout: 5000
      }).then(async () => {
        sendNotification(' has commented your post', postid, 'comment');
        refreshPost(postid);
        await displayComment(postid, commentBoxStateMap.get(postid));
      });
    }
  });
}

function sendNotification(message, who, how) {

  axios.post('./api-sendNotification.php', {
    notificationtext: message,
    fromwho: who,
    inWhichWay: how
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json',
    timeout: 5000
  }).then(response => {
    generateNotifications();
  });
}

async function displayComment(postid, isVisible) {
  if (isVisible) {
    let comments = await getCommentsByPostId(postid);
    document.getElementById("showComment" + postid).innerHTML
      = generateCommentsHTML(comments, postid);

  } else {
    document.getElementById("showComment" + postid).innerHTML = "";

  }

}

async function getCommentsByPostId(postid) {
  const response = await axios.post('./api-getPostComments.php', {
    commentById: postid
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json',
    timeout: 5000
  });
  const commentList = response.data === undefined ? [] : response.data;
  return commentList;
}

function generateCommentsHTML(comments, postid) {
  let result = `<div class="writeCommentArea">
                  <input id="commentBox${postid}" type="text" placeholder="comment this post.." required>
                  <button id="commentButton${postid}" type="submit">comment</button>
              </div>`;

  for (let i = 0; i < comments.length; i++) {
    const commentHtml = `
      <div class="postComment">
          <ul>
              <li> <img src="${comments[i]["usericon"]}" alt="usericon" /></li>
              <li><h3>@${comments[i]["username"]}</h3> </li>
              <li><p>${comments[i]["commenttext"]}</p></li>
          </ul>
      </div>`;

    result += commentHtml;
  }

  return result;
}

async function refreshPost(postid) {
  //axios query to get postid info
  //and push them to tag {nLike,nComment,nSave(?)}
  let post = document.getElementById(postid);
  axios.post('./api-post.php', {
    postid: postid
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json',
    timeout: 5000
  }).then( response => {
    post.querySelector(".nLike").innerHTML = response.data["nlike"];
    post.querySelector(".nComment").innerHTML = response.data["commented"];
    post.querySelector(".nSave").innerHTML = response.data["saved"];
  });

  //document.getElementById("commentBox" + postid).innerHTML = "";
  //await displayComment(postid, commentBoxStateMap.get(postid));
}



commentBoxStateMap = new Map();


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
      if (!commentBoxStateMap.has(postID)) {
        commentBoxStateMap.set(postID, false);
      }
      // If it is, do something
      showComment(postID);
    }
    if (event.target.classList.contains('save')) {
      // If it is, do something
      console.log('save post');
    }

  }

});






