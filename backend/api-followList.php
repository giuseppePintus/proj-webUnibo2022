<?php
    require_once "utils/bootstrap.php";

    if(!isset($_POST['offset']) || !isset($_POST['size']) || !isset($_POST['string']) 
        || !isset($_POST['user']) || !isset($_POST['action']) ){
        echo json_encode("");
        exit(0);
    }
    switch($_POST['action']){
        case 0:
            $user = $dbh->searchFollowedUser($_POST['offset'],$_POST['size'],$_POST['string'],$_POST['user'],$_SESSION["userid"]);
            break;
        case 1:
            $user = $dbh->searchFollowingUser($_POST['offset'],$_POST['size'],$_POST['string'],$_POST['user'],$_SESSION["userid"]);
            break;
    }
    header("Content-Type: application/json");
    echo json_encode($user);
?>
