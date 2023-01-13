const formHtml = `
  <html>
    <form action="api-editProfile.php" method="post" enctype="multipart/form-data">
      <label for="fname">Your Nickname:</label><br>
      <input type="text" id="nickname" name="nickname"><br>
      <hr>
      <label for="lname">Your Bio:</label><br>
      <input type="text" id="bio" name="bio"><br>
      <hr>
      Select image to change your icon: 
      <input type="file" name="fileToUpload1" id="fileToUpload1">
      <br>
      <hr>
      <input type="submit" value="Submit">
    </form>
  </html>`;

document.querySelector('main').innerHTML = formHtml;