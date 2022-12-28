<?php
require_once "utils/bootstrap.php";

//use Base template
$templateParams["pagetitle"] = "Tachyon - Search";
$templateParams["pagename"] = "Search";
$templateParams["usericon"] = UPLOAD_DIR . "icon.png";
$search="";

if(isset($_GET['search'])){
    $search = "js/search.js?search=".urlencode($_GET['search']);
}
else{
    $search = "js/search.js";
}
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/searchBar.js",$search);


require 'template/base.php';

?>