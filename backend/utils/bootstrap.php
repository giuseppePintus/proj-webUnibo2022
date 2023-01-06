<?php
$session_name = 'sec_session_id'; // Imposta un nome di sessione
$secure = true; // uso https
$httponly = true; // Questo impedirà ad un javascript di essere in grado di accedere all'id di sessione.
ini_set('session.use_only_cookies', 1); // limite Coockie
$cookieParams = session_get_cookie_params(); // Legge i parametri correnti relativi ai cookie.
session_set_cookie_params($cookieParams["lifetime"], $cookieParams["path"], $cookieParams["domain"], $secure, $httponly); 
session_name($session_name); // Imposta il nome di sessione con quello prescelto all'inizio della funzione.
session_start(); // Avvia la sessione php.

session_regenerate_id(); // Rigenera la sessione e cancella quella creata in precedenza.
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("localhost", "root", "", "TachyonDB", 3306);

?>