<?php
require_once("utils/bootstrap.php");
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);
$notificationid = $data['notificationid'];
$userid = $_SESSION["userid"];

$dbh->readNotification($notificationid, $userid);

$result = $dbh->getNotificationsToReadNumber($_SESSION["userid"]);
//$notiNumber = count($result) == 1 ? $result[0] : 0;
//$templateParams["notificationNumber"] = $notiNumber["number"];
header("Content-Type: application/json");
echo json_encode($result);

?>