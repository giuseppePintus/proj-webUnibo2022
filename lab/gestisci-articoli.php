<?php
require_once 'bootstrap.php';

if(!isUserLoggedIn() || !isset($_GET["action"]) || ($_GET["action"]!=1 && $_GET["action"]!=2 && $_GET["action"]!=3) || ($_GET["action"]!=1 && !isset($_GET["id"]))){
    header("location: login.php");
}

if($_GET["action"]!=1){
    $risultato = $dbh->getPostByIdAndAuthor($_GET["id"], $_SESSION["idautore"]);
    if(count($risultato)==0){
        $templateParams["articolo"] = null;
    }
    else{
        $templateParams["articolo"] = $risultato[0];
        $templateParams["articolo"]["categorie"] = explode(",", $templateParams["articolo"]["categorie"]);
    }
}
else{
    $templateParams["articolo"] = getEmptyArticle();
}




$templateParams["titolo"] = "Blog TW - Gestisci Articoli";
$templateParams["nome"] = "admin-form.php";
$templateParams["categorie"] = $dbh->getCategories();
$templateParams["articolicasuali"] = $dbh->getRandomPosts(2);

$templateParams["azione"] = $_GET["action"];

require 'template/base.php';
?>