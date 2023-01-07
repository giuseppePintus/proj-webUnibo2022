<?php
require_once("utils/functions.php");
require_once("db/database.php");

setIni(); // change configuration of php.ini file, | "functions.php"
session_start(); // Avvia nuova sessione php.   


if($_SERVER["SCRIPT_NAME"] == "/backend/login.php" || 
    $_SERVER["SCRIPT_NAME"] == "/backend/register.php" || 
    $_SERVER["SCRIPT_NAME"] == "/backend/api-checkUser.php" || 
    $_SERVER["SCRIPT_NAME"] == "/backend/api-registerUser.php" ){
        
    if (isset($_COOKIE['SID'])) {
        unset($_COOKIE['SID']); 
    }
}else{
    checkSession(); // close current session an

}

//session_regenerate_id(); // Rigenera la sessione e cancella quella creata in precedenza. usato per aumentare sicurezza




define("UPLOAD_DIR", "./upload/");

$dbh = new DatabaseHelper("localhost", "root", "", "TachyonDB", 3306);

?>