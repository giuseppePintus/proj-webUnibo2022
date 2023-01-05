<?php
    require_once "utils/bootstrap.php";
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);




    header('Content-Type: application/json');
    if(!isset($data['username']) || !isset($data['password'])){
        http_response_code(401);  // set the response code to 401 Unauthorized
        echo json_encode(['error' => 'post data not set']);        
        exit();
    }
    
    //Username not valid   
    if( !$dbh->checkUserExist($data['username'])){
        echo json_encode('Invalid username ');
        exit();
    }
    

    $expectPwd = strval($dbh -> getUserPassHash($data['username'])[0]);
    $equals = strcmp($expectPwd,  strval($data['password'] ));
    
    //check for password correctness
    if( $equals != 0){            
        echo json_encode('Invalid username or password');
        exit();
    }
    $_SESSION["Username"] =  $data['username'];
    $_SESSION["userid"] = $dbh->getUserId($data['username'])[0];
    $_SESSION["isAuth"] = true;
    $_SESSION["userfolder"] = $data['username'].'/';
   
    echo json_encode('ok'); 
    exit();
?>