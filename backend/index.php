<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    require_once 'utils/bootstrap.php';

    //use Base template
    $templateParams["pagetitle"] = "Tachyon - Home";
    $templateParams["pagename"] = "Home";
    $templateParams["usericon"] = UPLOAD_DIR . "icon.png";

    $templateParams["js"] = array("js/darkMode.js","https://unpkg.com/axios/dist/axios.min.js", "js/cookie.js","js/index.js", 
        "js/interaction.js" , "js/notifications.js" ,"js/searchBar.js");
    require 'template/base.php';
?>