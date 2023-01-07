<?php
    require_once "utils/bootstrap.php";
    //elimino cookie e sessione
    if (isset($_COOKIE["SID"])) {
        unset($_COOKIE["SID"]); 
        setcookie("SID", "", time()-3600);
    }    
    session_destroy();

    echo json_encode("ok");
    
    exit;
?>