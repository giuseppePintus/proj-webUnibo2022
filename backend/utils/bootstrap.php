<?php
require_once("utils/functions.php");
require_once("db/database.php");

setIni(); // change configuration of php.ini file, | "functions.php"
session_start(); // Avvia nuova sessione php.   

if( basename($_SERVER['PHP_SELF'])== "login.php" || 
    basename($_SERVER['PHP_SELF']) == "register.php" || 
    basename($_SERVER['PHP_SELF']) == "api-checkUser.php" || 
    basename($_SERVER['PHP_SELF']) == "api-registerUser.php" ){
        
    if (isset($_COOKIE['SID'])) {
        unset($_COOKIE['SID']); 
    }
}else{
    checkSession(); // close current session an

}

//session_regenerate_id(); // Rigenera la sessione e cancella quella creata in precedenza. usato per aumentare sicurezza




define("UPLOAD_DIR", "./upload/");

$dbh = new DatabaseHelper("localhost", "root", "", "TachyonDB", 3306);

$_SESSION["userid"] = 0;
?>