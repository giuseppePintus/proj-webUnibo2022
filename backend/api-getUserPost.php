<?php
require_once "utils/bootstrap.php";

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

$posts = $dbh->searchUserPost($data["offset"],$data["size"], $data["userid"]);
//from user



header("Content-Type: application/json");
echo json_encode($posts);

?>