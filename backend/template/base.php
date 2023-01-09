<?php
    $result = $dbh->getNotificationsToReadNumber($_SESSION["userid"]);
    $notiNumber = count($result) == 1 ? $result[0] : 0;
    $templateParams["notificationNumber"] = $notiNumber["number"];
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["pagetitle"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/stylebase.css" />
</head>

<body>
    <header>
        <a href="profile.php"><img src="<?php echo $templateParams['usericon'] ?>" alt="" /></a>
        <h1><?php echo $templateParams["pagename"] ?></h1>
        
        <form action="search.php" class="searchForm">
            <div class="searchBar">
                <input id="searchInfo" type="search" placeholder="Search.." name="search">
                <button type="submit" name="submitsearch">Go</button>
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
                <input id="newpost" type="text" placeholder="write something to share..." name="writepost" required>
                Select image to upload:
                <input type="file" name="fileToUpload" id="fileToUpload">
                <label for="file">Choose a file</label>
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