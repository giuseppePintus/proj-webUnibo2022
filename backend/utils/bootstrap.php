<?php
session_start();
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "TachyonDB", 3306);


//$_SESSION['userid'] = 0;
//$_SESSION["userfolder"] = 'giubby/';

// $result = $dbh->getNotificationsToReadNumber($_SESSION["userid"]);
// $notiNumber = count($result) == 1 ? $result[0] : 0;
// $templateParams["notificationNumber"] = $notiNumber["number"];
?>