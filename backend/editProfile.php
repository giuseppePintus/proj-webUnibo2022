<?php
require_once "utils/bootstrap.php";


//use Base template
$templateParams["pagetitle"] = "Tachyon - Edit Profile";
$templateParams["pagename"] = "Edit Profile";
//$templateParams["usericon"] = UPLOAD_DIR . "icon.png";

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/editProfile.js", "js/darkMode.js",
"js/interaction.js" , "js/notifications.js" ,"js/searchBar.js");
if (isset($_POST["user"])){
    $templateParams["userProfile"]= $_POST["user"];
}
else{
    $templateParams["userProfile"] = $_SESSION["userid"];
}
require 'template/base.php';
