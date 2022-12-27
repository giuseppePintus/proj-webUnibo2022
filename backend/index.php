<?php
require_once 'utils/bootstrap.php';

//use Base template
$templateParams["pagetitle"] = "Tachyon - Home";
$templateParams["pagename"] = "Home";
$templateParams["usericon"] = UPLOAD_DIR . "icon.png";

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/index.js");
require 'template/base.php';
?>