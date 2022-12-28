<?php
require_once "utils/bootstrap.php";
if(!isset($_GET["user"])){
    exit();
}

    
    //$userExist = $dbh->checkUser($_GET["user"]);
   
    $bytes = random_bytes(5); // genera 5 byte casuali
    $randomString = bin2hex($bytes); // converte i byte in una stringa esadecimale
    
    header("Content-Type: application/json");    
    $_SESSION['challengeString']= $randomString;
    $_SESSION['Username'] = $_GET["user"];
    echo json_encode($randomString);

?>