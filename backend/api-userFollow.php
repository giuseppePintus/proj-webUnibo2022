<?php

require_once("utils/bootstrap.php");
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
$followID = $data['user'];
$userid = $_SESSION["userid"];

if ($dbh->checkUserFollow($followID, $userid) == false) { //create follow
    $dbh->userFollow($userid, $followID);
    $result="unfollow";
} else { //delete follow 
    $dbh->userUnfollow($userid, $followID);
    $result="follow";
}

header("Content-Type: application/json");
echo json_encode($result);
