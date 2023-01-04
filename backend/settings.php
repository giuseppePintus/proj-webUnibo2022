<?php
    require_once 'utils/bootstrap.php';

    //use Base template
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
        <link rel="stylesheet" href="../backend/css/login.css">
        
    </head>
    <body>
        <div id="AccountInfo">                      
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
</html>