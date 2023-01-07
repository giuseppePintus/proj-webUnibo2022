<?php
    require_once "utils/bootstrap.php";
    //elimino cookie e sessione
    if (isset($_COOKIE['SID'])) {
        unset($_COOKIE['SID']); 
    }    
    session_destroy();
    //
    header('location: ./login.php');
    
    exit;
?>