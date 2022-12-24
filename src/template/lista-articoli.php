        <?php if(isset($templateParams["titolo_pagina"])): ?>
        <h2><?php echo $templateParams["titolo_pagina"]; ?></h2>
        <?php endif;?>
        <?php foreach($templateParams["articoli"] as $articolo): ?>
        <article>
            <header>
                <div>
                    <img src="<?php echo UPLOAD_DIR.$articolo["imgarticolo"]; ?>" alt="" />
                </div>
                <h2><?php echo $articolo["titoloarticolo"]; ?></h2>
                <p><?php echo $articolo["dataarticolo"]; ?> - <?php echo $articolo["nome"]; ?></p>
            </header>
            <section>
                <p><?php echo $articolo["anteprimaarticolo"]; ?></p>
            </section>
            <footer>
                <a href="articolo.php?id=<?php echo $articolo["idarticolo"]; ?>">Leggi tutto</a>
            </footer>
        </article>
        <?php endforeach; ?>