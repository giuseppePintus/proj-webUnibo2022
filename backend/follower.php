<?php
    require_once "utils/bootstrap.php";

    //use Base template
    $templateParams["pagetitle"] = "Tachyon - Profile";
    $templateParams["pagename"] = "follow";
    $templateParams["usericon"] = UPLOAD_DIR . "icon.png";

    $templateParams["js"] = array("js/darkMode.js","https://unpkg.com/axios/dist/axios.min.js","js/followPage.js", 
    "js/interaction.js" , "js/notifications.js" , "js/cookie.js");

    if( !isset($_POST["user"])){
        $user= $_SESSION["userid"];
    }else{
        $user= $_POST["user"];
    }
    if (isset($_POST["action"]) ){
        $templateParams["action"] = $_POST["action"];
    }
    else{
        $templateParams["action"]= 0;
    }
    $templateParams["userProfile"]= $user;
    require 'template/base.php';
?>