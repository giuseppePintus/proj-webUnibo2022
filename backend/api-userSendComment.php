<?php
    require_once("utils/bootstrap.php");
    $rawData = file_get_contents('php://input');
    $data = json_decode($rawData, true);
    $postid = $data['commentPostId'];
    $userid = $_SESSION["userid"];
    $commentText = $data['commentText'];

    $dbh->insertCommentToPost($postid, $commentText, $userid);
?>