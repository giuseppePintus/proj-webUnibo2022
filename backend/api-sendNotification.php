<?php
    require_once("utils/bootstrap.php");
    
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);

    $whichWay = $data['inWhichWay'];
    $some_id = $data['fromwho'];
    $to_user = $_SESSION["userid"];
    $from_user = $_SESSION["userid"];
    $msg = $data['notificationtext'];

    if($whichWay === 'like' || $whichWay === 'comment'){
        $result = $dbh->getUserIdFromPostId($some_id);
        $to_user = $result[0]['userid'];
        $from_user = $_SESSION["userid"];

    }else if($whichWay === 'follow'){
        // if i am following musk, some_id should be the user_id of which page i clicked follow
        $from_user = $_SESSION["userid"];
        $to_user = $some_id;
    }

    $result = $dbh->sendNotifications($msg , $to_user, $from_user);
    header("Content-Type: application/json");
    echo json_encode($result);
?>