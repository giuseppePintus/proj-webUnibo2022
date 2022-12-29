<?php
require_once 'utils/bootstrap.php';

//use Base template
$templateParams["pagetitle"] = "Tachyon - Register";
$templateParams["pagename"] = "Register";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/login.js");
require 'template/logSign.php';





?>