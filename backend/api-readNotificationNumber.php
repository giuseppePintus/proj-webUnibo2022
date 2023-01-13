<?php
    require_once("utils/bootstrap.php");

    $result = $dbh->getNotificationsToReadNumber($_SESSION["userid"]);

    header("Content-Type: application/json");
    echo json_encode($result);
?>