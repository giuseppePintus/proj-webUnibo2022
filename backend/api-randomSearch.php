<?php
require_once "utils/bootstrap.php";


if(!isset($_POST['offset']) || !isset($_POST['size']) ){
    echo json_encode("");
    exit(0);
}
$user = $dbh->searchRandomUser($_POST['offset'], $_POST['size'], $_SESSION["Username"]);
header("Content-Type: application/json");
echo json_encode($user);
?>