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
        <div id="notification-container" class="notification-container">
        <img id="notificationBellIcon" src="upload/notification.png" alt="notification">
        <?php if($templateParams["notificationNumber"] > 0)
            echo '<div id="notificationNumber" class="notificationNumber">'.$templateParams["notificationNumber"].'</div>';
        ?>
        </div>

        <div class="searchResult">
        </div>
    </header>

    <main class="main">
        <?php if ($templateParams["pagename"] == 'Home') {
            echo '<div class = "uploadPostImage"><form action="uploadPostImage.php" method="post" enctype="multipart/form-data">
            <input id="newpost" type="text" placeholder="write something to share..." name="writepost" required>
            Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
            <button type="submit" name="submitpost">post</button>
        </form></div>';
        } ?>


       <div class="profileInfo">
            <header>
                <div>
                    <img src="upload/html5-js-css3.png" alt="userbackground">
                </div>
            </header>
            <section>
                <div>
                    <img src="upload/giubby/icon.jpg" alt="usericon">
                </div>
                <ul>
                    <li><h1>Giuseppe Pintus</h1></li>
                    <li><h2>@Giubby</h2></li>
                    <li><p>I will be the next president! sssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p></li>
                </ul>
                <ul class="followSection">
                    <li><a href="#"><h3>30 followers<h3></a></li>
                    <li><a href="#"><h3>30 following<h3></a></li>
                    <li><button type="button" id="editprofile">Edit Profile</li>
                </ul>
            </section>

            <section class="profilePosts">
                <div>
                    <ul>
                        <li><button id="myPostsButton" type="button">My Posts</button></li>
                        <li><button type="likedPostsButton">Liked Posts</button></li>
                        <li><button type="CommentedPostsButton">Commented Posts</button></li>
                    </ul>
                </div>
            <section>
        </div>
    </main>

    <aside>
    </aside>
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