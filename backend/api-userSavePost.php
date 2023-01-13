<?php
    require_once("utils/bootstrap.php");
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
    $postid = $data['userSavePostId'];
    $userid = $_SESSION["userid"];

    $result = $dbh->readIfUserSavedPost($postid, $userid);
    $save = count($result) == 1 ? $result[0] : 0;

    if ($save['saves'] == 1) { //delete save
        $dbh->userUnsavedPost($userid, $postid);
    } else { //create like
        $dbh->userSavedPost($userid, $postid);
    }

    header("Content-Type: application/json");
    echo json_encode($result);
?>
