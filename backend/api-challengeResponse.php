<?php
require_once "utils/bootstrap.php";

if(!isset($_GET['challenge'])){
    exit();
}

$key = $dbh->getUserPassHash($_SESSION['Username']);
$data = $_SESSION['challengeString'];

$challengeResponse = openssl_encrypt($data, 'aes-256-gcm', $key, OPENSSL_RAW_DATA);

//header('Location: ../backend/index.php', true, 301);

if($challengeResponse == $_POST['challenge']){
    header("Content-Type: application/json");    
    echo json_encode(array('risultato' => "UNZIONAAA"));
}
exit();
?>