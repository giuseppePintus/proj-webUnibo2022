<?php
require_once "utils/bootstrap.php";

if(!isset($_POST["offset"]) || !isset($_POST["size"]) ){
    exit(0);
}
$posts = $dbh->searchRandomPost($_POST["offset"],$_POST["size"], $_SESSION["userid"]);


header("Content-Type: application/json");
echo json_encode($posts);

?>