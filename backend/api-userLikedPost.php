<?php
    require_once("utils/bootstrap.php");
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
    $postid = $data['userLikedPostId'];
    $userid = $_SESSION["userid"];

    $result = $dbh->readIfUserLikedPost($postid, $userid);
    $like = count($result) == 1 ? $result[0] : 0;

    if ($like['likes'] == 1) { //delete like
        $dbh->userUnLikedPost($userid, $postid);
    } else { //create like
        $dbh->userLikedPost($userid, $postid);
    }

    header("Content-Type: application/json");
    echo json_encode($result);
?>
