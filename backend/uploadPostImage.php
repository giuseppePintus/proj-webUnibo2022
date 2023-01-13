<?php
  require_once "utils/bootstrap.php";

  $target_dir = UPLOAD_DIR;

  // based on the user's login, his pictures will be uploaded to his folder.
  $target_dir .= $_SESSION["userfolder"];

  $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  if (isset($_POST["submitpost"])) {
    if (!empty($_FILES["fileToUpload"]["tmp_name"]))
      $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check !== false) {
      echo "File is an image - " . $check["mime"] . ".";
      $uploadOk = 1;
    } else {
      echo "File is not an image.";
      $uploadOk = 0;
    }
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
  }

  // Check file size
  if ($_FILES["fileToUpload"]["size"] > 1000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
  }

  // Allow certain file formats
  if (
    $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif"
  ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
  }


  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
  } else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
      echo "The file " . htmlspecialchars(basename($_FILES["fileToUpload"]["name"])) . " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
  }

  if (isset($_POST["writepost"])) {
    $posttext = $_POST["writepost"];
  }
  if (isset($_SESSION["userid"])) {
    $userid = $_SESSION["userid"];
  }
  if (empty($_FILES["fileToUpload"]["tmp_name"]))
    $target_file = null;

  header("Location: ".$_SERVER['HTTP_REFERER']);

  $dbh->sendNewPost($_SESSION["userid"], $posttext, $target_file);
?>
