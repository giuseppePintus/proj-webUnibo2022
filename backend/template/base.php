<?php
    $result = $dbh->getNotificationsToReadNumber($_SESSION["userid"]);
    $notiNumber = count($result) == 1 ? $result[0] : 0;
    $templateParams["notificationNumber"] = $notiNumber["number"];
?>

<!DOCTYPE html>
<html lang="en" xml:lang="en">
    <head>
        <meta content="width=device-width, initial-scale=1.0">
        <title><?php echo $templateParams["pagetitle"]; ?></title>
        <link rel="icon" href="./upload/logo.ico" type="image/x-icon">
        <link rel="stylesheet" type="text/css" href="./css/style.css" />

    </head>
    <body>
        <header>
            <a href="profile.php"><img src="<?php echo $dbh->searchUserInfo($_SESSION["userid"])['usericon']; ?>" alt="usericon" /></a>
            <h1><?php echo $templateParams["pagename"] ?></h1>
            
            <form action="search.php" class="searchForm">
                <div class="searchBar">
                    <input id="searchInfo" type="search" title="search" placeholder="Search.." name="search"/>
                    <button type="submit" >Go</button>
                </div>
            </form>
            <div id="notification-container" class="notificationIcon">
                <?php if($templateParams["notificationNumber"] > 0)
                    echo '<div id="notificationNumber" class="notificationNumber">'.$templateParams["notificationNumber"].'</div>';
                ?>
                <img id="notificationBellIcon" src="upload/notification.png" alt="notification">
            </div>

            <div class="searchResult close">
            </div>
        </header>
        <div class="centerPage">
            <main class="main">
                <?php if ($templateParams["pagename"] == 'Home' || $templateParams["pagename"] == 'Profile') {
                    echo '<div class = "uploadPostImage">
                    <form action="uploadPostImage.php" method="post" enctype="multipart/form-data">
                        <input id="newpost" type="text" placeholder="write something to share..." name="writepost" title="writepost" required>
                        Select image to upload:
                        <input type="file" name="fileToUpload" id="fileToUpload" title="fileToUpload">
                        <button type="submit" name="submitpost">post</button>
                    </form></div>';
                } ?>
            </main>

            <aside>
            </aside>
        </div>
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
        <?php    
            if (isset($templateParams["userProfile"])) :        
        ?>
        <script>
        let variable = <?php echo $templateParams["userProfile"]; ?>;
        </script>
        <?php       
            endif;
        ?>
        <?php    
            if (isset($templateParams["action"])) :        
        ?>
        <script>
        let action = <?php echo $templateParams["action"]; ?>;
        </script>
        <?php       
            endif;
        ?>
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