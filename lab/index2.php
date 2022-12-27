<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Blog TW - Home";
$templateParams["categorie"] = $dbh->getCategories();
$templateParams["articolicasuali"] = $dbh->getRandomPosts(2);

$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/index.js");

require 'template/base.php';
?>