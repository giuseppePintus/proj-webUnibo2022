<?php
require_once "utils/bootstrap.php";

if(!isset($_GET['challenge'])){
    exit();
}

$key = $dbh.getUserPass($_SESSION['Username']);
$data = $_SESSION['challengeString'];

$challengeResponse = openssl_encrypt($data, 'aes-256-gcm', $key, OPENSSL_RAW_DATA);

if($challengeResponse == $_POST['challenge']){
    echo("everything is right");
    header('Location: ../backend/index.php', true, 301);
    exit();
}
exit();
?>