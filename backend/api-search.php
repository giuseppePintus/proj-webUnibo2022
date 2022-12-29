<?php
require_once "utils/bootstrap.php";

//./api-search.php?A='+A+'&B='+B+'&S='+input.value;

if(!isset($_GET["A"]) || !isset($_GET["B"]) || !isset($_GET["S"])){
    echo json_encode("porcoddio");
}

//$posts = $dbh->searchUser($_GET["A"],$_GET["B"],$_GET["S"],$_SESSION["Username"]);
$posts = $dbh->searchUser($_GET["A"],$_GET["B"],$_GET["S"],$_SESSION["Username"]);
header("Content-Type: application/json");
echo json_encode($posts);

?>