<?php
session_start();
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "TachyonDB", 3306);

$_SESSION["Username"]="pippo";
$_SESSION['userid'] = '0';
$_SESSION["userfolder"] = 'giubby/';
?>