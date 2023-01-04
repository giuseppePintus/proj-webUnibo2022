<?php
require_once "utils/bootstrap.php";
if(!isset($_POST["userID"])){
    echo json_encode(" ");
    exit(0);
}
$posts = $dbh->searchUserInfo($_POST["userID"]);
//return user info

header("Content-Type: application/json");
echo json_encode($posts);

?>