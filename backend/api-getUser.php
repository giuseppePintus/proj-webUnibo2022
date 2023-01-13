<?php
    require_once "utils/bootstrap.php";

    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
    $user = $data['user'];

    if(!isset($user) || $user === $_SESSION["userid"] ){
        $posts = $dbh->searchUserInfo($_SESSION["userid"]);
    }else{
        $posts = $dbh->searchOtherUserInfo($_SESSION["userid"],$user);
        //return user info
    }

    header("Content-Type: application/json");
    echo json_encode($posts);
?>