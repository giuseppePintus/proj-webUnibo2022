<?php
require_once "utils/bootstrap.php";

//use Base template
$templateParams["pagetitle"] = "Tachyon - Login";
$templateParams["pagename"] = "Login";
$templateParams["usericon"] = UPLOAD_DIR . "icon.png";

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/login.js");
//require 'template/base.php';


function checkData()
{
    //check for input by user
    if ( !isset($_POST['username']) ) {
        exit('Please enter your username');
    }
    if ( !isset($_POST['password']) ) {
        exit('Please enter your password');
    }
}

?>