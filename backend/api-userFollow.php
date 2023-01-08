<?php

require_once("utils/bootstrap.php");
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
$followID = $data['user'];
$userid = $_SESSION["userid"];

if ($dbh->checkUserFollow($userid , $followID)["count"] >0) { //delete follow
    $dbh->userUnfollow($userid, $followID);
    $result="follow";
} else {  //create follow
    $dbh->userFollow($userid, $followID);
    $result="unfollow";
}
header("Content-Type: application/json");
echo json_encode($result);
