<?php
    require_once "utils/bootstrap.php";
    
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);




    header('Content-Type: application/json');
    if(!isset($data['username']) || !isset($data['password'])){
        http_response_code(401);  // set the response code to 401 Unauthorized
        echo json_encode('data');        
        exit();
    }
    
    //Username not valid   
    if( !$dbh->checkUserExist($data['username'])){
        echo json_encode('usrPwd');
        exit();
    }
    $userId = $dbh->getUserId($data['username'])[0];
    $dbh->addLoginAttempts($userId);

        //allows 5 attempts in the last 5 minutes -> 5+1(current) = 6 attempts max
    if ($dbh->getLoginAttempts($userId)[0] > 7) {
        echo json_encode("Brute");     
        exit();
    }
    

    $expectPwd = strval($dbh -> getUserPassHash($data['username'])[0]);
    $equals = strcmp($expectPwd,  strval($data['password'] ));
    
    //check for password correctness
    if( $equals != 0){            
        echo json_encode('usrPwd');
        exit();
    }
    
//cookie per memorizzare sessione di login
    setcookie("SID", session_id(), 0);

    $_SESSION["Username"] =  $data['username'];
    $_SESSION["userid"] = $userId;
    $_SESSION["isAuth"] = true;
    $_SESSION["userfolder"] = $data['username'].'/';
   
    echo json_encode('ok'); 
    exit();

?>