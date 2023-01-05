<?php
require_once "utils/bootstrap.php";
if(!isset($_POST["userID"])){
    $posts = $dbh->searchUserInfo($_SESSION["userid"]);
}else{
    $posts = $dbh->searchUserInfo($_POST["userID"]);
    //return user info
}


header("Content-Type: application/json");
echo json_encode($posts);

?>