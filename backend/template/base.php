<!DOCTYPE html>
<html lang="it">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $templateParams["pagetitle"]; ?></title>
    <link rel="stylesheet" type="text/css" href="./css/gpt.css?version=51" />
</head>

<body>
    <header>
        <img src="<?php echo $templateParams['usericon'] ?>" alt="" />
        <h2><?php echo $templateParams["pagename"] ?></h2>
        <form action="searchpost">
            <input type="text" placeholder="Search.." name="search">
            <button type="submit" name="submit">Go</button>
        </form>
    </header>



    <main>
    </main>
    <aside>
        <section>
            <h2>Categorie</h2>
            <ul>
                <li><a href="#">HTML</a></li>
                <li><a href="#">CSS</a></li>
                <li><a href="#">PHP</a></li>
                <li><a href="#">Javascript</a></li>
                <li><a href="#">jQuery</a></li>
                <li><a href="#">Apache</a></li>
            </ul>
        </section>
    </aside>
    <div class="footer-container">
    <footer>
        <ul>
            <li><a <?php isActive("index.php"); ?> href="index.php"><img src="upload/home.png" alt="home" /></a></li>
            <li><a <?php isActive("archivio.php"); ?> href="archivio.php"><img src="upload/search.png" alt="search" /></a></li>
            <li><a <?php isActive("contatti.php"); ?> href="contatti.php"><img src="upload/user.png" alt="profile" /></a></li>
            <li><a <?php isActive("login.php"); ?> href="login.php"><img src="upload/setting.png" alt="setting" /></a></li>
        </ul>
    </footer>
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