<?php
require_once 'utils/bootstrap.php';

//use Base template
$templateParams["pagetitle"] = "Tachyon - SignUp";
$templateParams["pagename"] = "SignUp";
$templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/register.js" , "js/darkMode.js");

?>
<!DOCTYPE html>
<html lang="it-IT">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tachyon-SignUp</title>
        <link rel="icon" href="../img/logo.ico" type="image/x-icon">
        <link rel="stylesheet" href="../backend/css/login.css">
        
    </head>
    <body>
        <div class="loginDiv" id="loginDiv">
            <img src="../img/logo.png"/>
            <h1> Welcome to Tachyon</h1> 
            <h2> Sign Up </h2>
            <form id="LoginForm">
                <input type="text"      name="EmailIn"  id="emailInput" class="emailIn"  placeholder="Email" >
                <input type="text"      name="UsernameIn"  id="userInput" class="usrIn"  placeholder="Username" >
                <input type="password"  name="PasswordIn"  id="passInput" class="passIn" placeholder="Password">
                <input type="button"    name="LoginButton" value="Register"  onclick="register()">
            </form> 
        </div>
        <?php

            if (isset($templateParams["js"])) :
                foreach ($templateParams["js"] as $script) :
            ?>
                    <script src="<?php echo $script; ?>"></script>
            <?php
                endforeach;
            endif;
        ?>
    </body>
    <footer>
        <p>
            <a href="privacy.html"> Informativa Privacy </a> 
            |
            <a href="cookie.html"> Cookie </a>       
            | ©2022 -
            <a href="credit.html"> Credit </a>

        </p>
        
        
    </footer>
</html>