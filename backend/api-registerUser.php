<?php

    require_once 'utils/bootstrap.php';

    if (!isset($_GET['email']) || !isset($_GET['username']) || !isset($_GET['password'])){
        echo('missing data');
        exit();
    }

    if( $dbh -> checkUserExist($_GET['username']) == 1){
        echo json_encode('username gia esistente');
        exit();
    }

    if( $dbh -> checkEmailExist($_GET['email']) == 1){
        echo json_encode('email gia esistente');
        exit();
    }

    $dbh -> addAccount($_GET['username'], $_GET['email'], $_GET['username'], $_GET['password']);
    
    sendEmail($_GET['email']);
    echo ("GO");
    exit();

?>