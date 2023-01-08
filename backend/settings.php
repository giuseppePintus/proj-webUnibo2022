<?php
    require_once 'utils/bootstrap.php';



    $templateParams["pagetitle"] = "Tachyon - Settings";
    $templateParams["pagename"] = "Settings";
    $templateParams["js"] = array("https://unpkg.com/axios/dist/axios.min.js","js/settings.js");
?>
 <!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.00">
        <title>Tachyon-Login</title>
        <link rel="icon" href="../img/logo.ico" type="image/x-icon">
        <link rel="stylesheet" href="./css/stylebase.css">
        
    </head> 
    <body> 

        <div class="settings">                      
            <input type="button"  name="LogoutButton" value="Log out"  onclick="logout()">
            <input type="button"  name="PersButton" value="Personalizza"  onclick="changeColor()">
            <input type="button"  name="NightButton" value="Modalita' notte"  onclick="nightMode()">
            <!-- <input type="button"  name="changeLangButton" value="cambia lingua"  onclick="change Lang"> -->
            <input type="button"  name="changePassButton" value="cambia password"  onclick="changePassword()">
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
        <footer>
        <div class="footer-container">
            <ul>
                <li><a <?php isActive("index.php"); ?> href="index.php"><img src="upload/home.png" alt="home" /></a></li>
                <li><a <?php isActive("search.php"); ?> href="search.php"><img src="upload/search.png" alt="search" /></a></li>
                <li><a <?php isActive("profile.php"); ?> href="profile.php"><img src="upload/user.png" alt="profile" /></a></li>
                <li><a <?php isActive("login.php"); ?> href="settings.php"><img src="upload/setting.png" alt="setting" /></a></li>
            </ul>
        </div>
    </footer>
    </body>
</html> 