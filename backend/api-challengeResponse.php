<?php
require_once "utils/bootstrap.php";

if(!isset($_POST['challenge'])){
    //exit();
}

$key = $dbh->getUserPassHash($_SESSION['Username']);
$data = $_SESSION['challengeString'];

$sha256_bin = hex2bin($key);

// Extract the first 16 bytes of the binary data as the IV
$iv = substr($sha256_bin, 0, 16);

openssl_cipher_iv_length('aes-256-gcm');

$challengeResponse = openssl_encrypt($data, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv);

//header('Location: ../backend/index.php', true, 301);

header("Content-Type: application/json");    
if($challengeResponse == $_POST['challenge']){
}
echo json_encode($_POST["challenge"]);

$challenge = $_POST['challenge'];
echo($challenge)
//exit();
?>