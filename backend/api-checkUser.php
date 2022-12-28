<?php
require_once "utils/bootstrap.php";
if(!isset($_GET["user"])){
    exit();
}

    
    $posts = $dbh->checkUser($_GET["user"]);
    //$posts = $dbh->getFollowingRecentPosts(20);
    $bytes = random_bytes(5); // genera 5 byte casuali
    $randomString = bin2hex($bytes); // converte i byte in una stringa esadecimale
    
    header("Content-Type: application/json");    
    $_SESSION['challengeString']= $randomString;
    echo json_encode($randomString);

?>