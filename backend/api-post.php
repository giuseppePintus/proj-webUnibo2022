<?php
require_once "utils/bootstrap.php";
$posts = $dbh->getRandomPost(100);

header("Content-Type: application/json");
echo json_encode($posts);

?>