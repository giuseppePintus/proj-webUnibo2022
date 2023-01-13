<?php
    require_once("utils/bootstrap.php");

    $result = $dbh->getNotifications($_SESSION["userid"]);

    header("Content-Type: application/json");
    echo json_encode($result); 
?>