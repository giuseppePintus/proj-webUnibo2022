<?php
require_once 'bootstrap.php';

if(!isUserLoggedIn() || !isset($_POST["action"])){
    header("location: login.php");
}
if($_POST["action"]==1){
    //Inserisco
    $titoloarticolo = htmlspecialchars($_POST["titoloarticolo"]);
    $testoarticolo = htmlspecialchars($_POST["testoarticolo"]);
    $anteprimaarticolo = htmlspecialchars($_POST["anteprimaarticolo"]);
    $dataarticolo = date("Y-m-d");
    $autore = $_SESSION["idautore"];

    $categorie = $dbh->getCategories();
    $categorie_inserite = array();
    foreach($categorie as $categoria){
        if(isset($_POST["categoria_".$categoria["idcategoria"]])){
            array_push($categorie_inserite, $categoria["idcategoria"]);
        }
    }

    list($result, $msg) = uploadImage(UPLOAD_DIR, $_FILES["imgarticolo"]);
    if($result != 0){
        $imgarticolo = $msg;
        $id = $dbh->insertArticle($titoloarticolo, $testoarticolo, $anteprimaarticolo, $dataarticolo, $imgarticolo, $autore);
        if($id!=false){
            foreach($categorie_inserite as $categoria){
                $ris = $dbh->insertCategoryOfArticle($id, $categoria);
            }
            $msg = "Inserimento completato correttamente!";
        }
        else{
            $msg = "Errore in inserimento!";
        }
        
    }
    header("location: login.php?formmsg=".$msg);
}
if($_POST["action"]==2){
    //modifico
    $titoloarticolo = htmlspecialchars($_POST["titoloarticolo"]);
    $testoarticolo = htmlspecialchars($_POST["testoarticolo"]);
    $anteprimaarticolo = htmlspecialchars($_POST["anteprimaarticolo"]);
    $anteprimaarticolo = $_POST["anteprimaarticolo"];
    $autore = $_SESSION["idautore"];

    if(isset($_FILES["imgarticolo"]) && strlen($_FILES["imgarticolo"]["name"])>0){
        list($result, $msg) = uploadImage(UPLOAD_DIR, $_FILES["imgarticolo"]);
        if($result == 0){
            header("location: login.php?formmsg=".$msg);
        }
        $imgarticolo = $msg;

    }
    else{
        $imgarticolo = $_POST["oldimg"];
    }
    $dbh->updateArticleOfAuthor($idarticolo, $titoloarticolo, $testoarticolo, $anteprimaarticolo, $imgarticolo, $autore);

    $categorie = $dbh->getCategories();
    $categorie_inserite = array();
    foreach($categorie as $categoria){
        if(isset($_POST["categoria_".$categoria["idcategoria"]])){
            array_push($categorie_inserite, $categoria["idcategoria"]);
        }
    }
    $categorievecchie = explode(",", $_POST["categorie"]);

    $categoriedaeliminare = array_diff($categorievecchie, $categorie_inserite);
    foreach($categoriedaeliminare as $categoria){
        $ris = $dbh->deleteCategoryOfArticle($idarticolo, $categoria);
    }
    $categoriedainserire = array_diff($categorie_inserite, $categorievecchie);
    foreach($categoriedainserire as $categoria){
        $ris = $dbh->insertCategoryOfArticle($idarticolo, $categoria);
    }

    $msg = "Modifica completata correttamente!";
    header("location: login.php?formmsg=".$msg);
}

if($_POST["action"]==3){
    //cancello
    echo "entro";
    $idarticolo = $_POST["idarticolo"];
    $autore =  $_SESSION["idautore"];
    $dbh->deleteCategoriesOfArticle($idarticolo);
    $dbh->deleteArticleOfAuthor($idarticolo, $autore);
    
    $msg = "Cancellazione completata correttamente!";
    header("location: login.php?formmsg=".$msg);
}

?>