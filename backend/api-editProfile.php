<?php
require_once "utils/bootstrap.php";

if(!isset($_POST['nickname']) && !isset($_POST['bio'])){
    echo "Your data is invalid";
    exit(0);
}
$userid = $_SESSION["userid"];
if(!empty($_POST['nickname'])){
    $dbh->modifyUserNickname($userid, $_POST['nickname']);
}
if(!empty($_POST['bio'])){
    $dbh->modifyUserBio($userid, $_POST['bio']);
}

require('profile.php');

?>

