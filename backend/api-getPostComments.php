<?php
    require_once("utils/bootstrap.php");

    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
    $result = $dbh->getPostComments($data['commentById']);
    header("Content-Type: application/json");
    echo json_encode($result);
?>