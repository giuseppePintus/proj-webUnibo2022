<?php
require_once "utils/bootstrap.php";
$posts = $dbh->getRandomPost(1);
//$posts = $dbh->getFollowingRecentPosts(20);

/*for($i = 0; $i < count($posts); $i++){
    $posts[$i]['postimage'] = UPLOAD_DIR.$posts[$i]['postimage'];
    $posts[$i]['usericon'] = UPLOAD_DIR.$posts[$i]['usericon'];
}
*/
header("Content-Type: application/json");
echo json_encode($posts);

?>