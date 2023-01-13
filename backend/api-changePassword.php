<?php
    require_once "utils/bootstrap.php";
    
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    header('Content-Type: application/json');
    if(!isset($data['oldPass']) || !isset($data['newPass'])){
        http_response_code(401);  // set the response code to 401 Unauthorized
        echo json_encode('Error during communication');        
        exit();
    }

    $currentPass = $dbh->getUserPassHash($_SESSION["Username"]);

    if($currentPass[0] != $data['oldPass']){
        echo json_encode($currentPass);        
        exit();
    }
    
    $dbh->setNewPassword($data['newPass'], $_SESSION['userid']);
    
    echo json_encode('ok'); 
    exit();
?>