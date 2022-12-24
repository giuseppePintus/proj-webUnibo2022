<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Blog TW - Contatti";
$templateParams["nome"] = "contatti.php";
$templateParams["categorie"] = $dbh->getCategories();
$templateParams["articolicasuali"] = $dbh->getRandomPosts(2);
//Home Template
$templateParams["autori"] = $dbh->getAuthors();

require 'template/base.php';
?>