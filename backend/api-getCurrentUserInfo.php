<?php    
    require_once("utils/bootstrap.php");

    $result = $dbh->getCurrentUserInfo();

    header("Content-Type: application/json");
    echo json_encode($result); 
?>