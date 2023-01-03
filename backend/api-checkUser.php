<?php
    require_once "utils/bootstrap.php";
    
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    if(!isset($data['username']) || !isset($data['password'])){
        http_response_code(401);  // set the response code to 401 Unauthorized
        header('Content-Type: application/json');
        echo json_encode(['error' => 'post data not set']);

        exit();
    }

    //Username not valid
    if( $dbh->checkUserExist($data['username']) == 0){
        http_response_code(401);  // set the response code to 401 Unauthorized
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid username ']);
        exit();
    }
    $expectPwd = strval($dbh -> getUserPassHash($data['username'])[0]);
    $equals = strcmp($expectPwd,  strval($data['password'] ));
    //check for password correctness
    if( $equals !== 0){
        http_response_code(401);  // set the response code to 401 Unauthorized
        header('Content-Type: application/json');
        echo json_encode(['error' =>  $equals ]);
        exit();
    }

    $_SESSION['Username'] = $data['username'];
    $_SESSION['userid'] = $dbh->getUserId($data['username']);
    $_SESSION['isAuth'] = true;

    header('Content-Type: application/json');
        echo json_encode(['response' => 'ok']);
    exit();
?>