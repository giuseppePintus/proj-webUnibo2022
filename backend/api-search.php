<?php
require_once "utils/bootstrap.php";

if(!isset($_POST['offset']) || !isset($_POST['size']) || !isset($_POST['string'])){
    echo json_encode("");
    exit(0);
}
$user = $dbh->searchUser($_POST['offset'],$_POST['size'],$_POST['string'],$_SESSION["userid"]);
header("Content-Type: application/json");
echo json_encode($user);
?>