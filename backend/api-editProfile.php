<?php
require_once "utils/bootstrap.php";

if(!isset($_POST['nickname']) && !isset($_POST['bio']) && !$_FILES["fileToUpload1"]["name"]){
    echo "Your data is invalid";
    exit(0);
}
$userid = $_SESSION["userid"];
$target_dir = UPLOAD_DIR;
$target_dir .= $_SESSION["userfolder"];

if(!empty($_POST['nickname'])){
    $dbh->modifyUserNickname($userid, $_POST['nickname']);
}
if(!empty($_POST['bio'])){
    $dbh->modifyUserBio($userid, $_POST['bio']);
}

if($_FILES["fileToUpload1"]["name"]){

    list($result, $msg) = uploadImage($target_dir, $_FILES["fileToUpload1"]);
    if($result != 0){
        $dbh->modifyUserIcon($userid, $msg);
    }
}


require('profile.php');

?>

