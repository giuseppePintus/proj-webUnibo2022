<?php
require_once "utils/bootstrap.php";

//use Base template
$templateParams["pagetitle"] = "Tachyon - Profile";
$templateParams["pagename"] = "Profile";
$templateParams["usericon"] = UPLOAD_DIR . "icon.png";

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/profile.js");
require 'template/base.php';

?>