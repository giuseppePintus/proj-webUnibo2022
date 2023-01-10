<?php
require_once "utils/bootstrap.php";


if(!isset($_POST['offset']) || !isset($_POST['size']) || !isset($_POST['userDisplaySelector'])){
    echo json_encode("");
    exit(0);
}
$userSelector = $_POST['userDisplaySelector'];
// 0 random users, 1 followed users, 2 following users
if($userSelector == 0){
    $user = $dbh->searchRandomUser($_POST['offset'], $_POST['size'], $_SESSION["userid"]);
}else if ($userSelector == 1){
    $user = $dbh->searchFollowedUser($_POST['offset'], $_POST['size'], $_SESSION["userid"]);
}else if ($userSelector == 2){
    $user = $dbh->searchFollowingUser($_POST['offset'], $_POST['size'], $_SESSION["userid"]);

}
header("Content-Type: application/json");
echo json_encode($user);
?>