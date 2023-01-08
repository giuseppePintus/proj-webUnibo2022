<?php
require_once "utils/bootstrap.php";

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

$selector = $data["display"];
if ($selector == 0) {
    //my posts
    $posts = $dbh->searchUserPost($data["offset"], $data["size"], $data["user"]);
} else if ($selector == 1) {
    //liked posts
    $posts = $dbh->searchUserLikedPost($data["offset"], $data["size"], $data["user"]);
} else if ($selector == 2) {
    //commented posts
    $posts = $dbh->searchUserCommentedPost($data["offset"], $data["size"], $data["user"]);
}

header("Content-Type: application/json");
echo json_encode($posts);
