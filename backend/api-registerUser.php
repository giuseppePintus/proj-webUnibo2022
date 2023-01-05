<?php

    require_once 'utils/bootstrap.php';
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);
   
    if (!isset($data['email']) || !isset($data['username']) || !isset($data['password'])){
        echo('missing data');
        exit();
    }
   
    if( $dbh -> checkEmailExist($data['email'])){
        echo json_encode('email gia esistente');    
        exit();    
    }
    
    if( $dbh -> checkUserExist($data['username'])){
        echo json_encode('username gia esistente'); 
        exit();       
    }

    $dbh -> addAccount($data['username'], $data['email'], $data['username'], $data['password']);
    
    //sendEmail($data['email']);

    echo json_encode("OK");
    
    exit();

?>