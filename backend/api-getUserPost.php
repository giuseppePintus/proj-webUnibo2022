<?php
require_once "utils/bootstrap.php";

if(!isset($_POST["offset"]) || !isset($_POST["size"]) || !isset($_POST["user"])){
    echo json_encode(" ".$_POST["offset"]);
    exit(0);
}
$posts = $dbh->searchUserPost($_POST["offset"],$_POST["size"], $_POST["user"]);
//from user



header("Content-Type: application/json");
echo json_encode($posts);

?>