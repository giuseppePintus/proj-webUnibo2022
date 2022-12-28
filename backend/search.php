<?php
require_once "utils/bootstrap.php";

//use Base template
$templateParams["pagetitle"] = "Tachyon - Search";
$templateParams["pagename"] = "Search";
$templateParams["usericon"] = UPLOAD_DIR . "icon.png";

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/search.js");
require 'template/base.php';

?>