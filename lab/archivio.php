<?php
require_once 'bootstrap.php';

//Base Template
$templateParams["titolo"] = "Blog TW - Archivio";
$templateParams["nome"] = "lista-articoli.php";
$templateParams["categorie"] = $dbh->getCategories();
$templateParams["articolicasuali"] = $dbh->getRandomPosts(2);
//Home Template
$templateParams["articoli"] = $dbh->getPosts();

require 'template/base.php';
?>