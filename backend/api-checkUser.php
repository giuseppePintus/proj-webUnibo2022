<?php
require_once "utils/bootstrap.php";
if(!isset($_GET["user"])){
    exit();
}

    
    if( $dbh->checkUserExist($_GET["user"]) == 0){
        //print_r($_GET["user"]. "_");
        //print_r($dbh->checkUserExist($_GET["user"]));

        $arrayName = array( 'user' => ($_GET["user"]), 
                            'res' =>  "userNotFound");
        echo json_encode($arrayName);
        exit();
    }
   
    $bytes = random_bytes(5); // genera 5 byte casuali
    $randomString = bin2hex($bytes); // converte i byte in una stringa esadecimale
    
    $_SESSION['challengeString']= $randomString;
    $_SESSION['Username'] = $_GET["user"];
    $_SESSION['userid'] = $dbh->getUserId($_SESSION['Username']);
    header("Content-Type: application/json");    
    echo json_encode(array('string' => $randomString));
    exit();
?>