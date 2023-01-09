<?php
require_once "utils/bootstrap.php";
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if(!isset($data["postid"])){
    // exit(0);
}
$postid = $data['postid'];
$posts = $dbh->searchPost($postid);
header("Content-Type: application/json");
echo json_encode($posts);