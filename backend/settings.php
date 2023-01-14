<?php
    require_once 'utils/bootstrap.php';

    $templateParams["pagetitle"] = "Tachyon - Settings";
    $templateParams["pagename"] = "Settings";
    $templateParams["js"] = array("js/darkMode.js","https://unpkg.com/axios/dist/axios.min.js","js/settings.js","js/notifications.js",  "js/cookie.js");

    require 'template/base.php'
?>
 