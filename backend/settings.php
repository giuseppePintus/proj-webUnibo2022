<?php
    require_once 'utils/bootstrap.php';



    $templateParams["pagetitle"] = "Tachyon - Settings";
    $templateParams["pagename"] = "Settings";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/settings.js");

    require 'template/base.php'
?>
 