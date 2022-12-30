<?php
require_once "utils/bootstrap.php";

if(!isset($_POST['challenge'])){
    //exit();
}

$data = $_SESSION['challengeString'];
$key = $dbh->getUserPassHash($_SESSION['Username']);
$sha256_bin = hex2bin($key[0]);
$keyStr = implode('',$key);


// Extract the first 16 bytes of the binary data as the IV
$iv = substr($sha256_bin, 0, 16);

openssl_cipher_iv_length('aes-256-gcm');
$tagg = null;

$challengeResponse = openssl_encrypt($data, 'aes-256-gcm', $keyStr, OPENSSL_RAW_DATA, $iv, $tagg);

//header('Location: ../backend/index.php', true, 301);

header("Content-Type: application/json");    
if($challengeResponse == $_GET['challenge']){
}
echo ($challengeResponse."   ".  $_GET['challenge'] );

exit();
?>