        <?php 
            $articolo = $templateParams["articolo"]; 
            $azione = getAction($templateParams["azione"])
        ?>
        <form action="processa-articolo.php" method="POST" enctype="multipart/form-data">
            <h2>Gestisci Articolo</h2>
            <?php if($articolo==null): ?>
            <p>Articolo non trovato</p>
            <?php else: ?>
            <ul>
                <li>
                    <label for="titoloarticolo">Titolo:</label><input type="text" id="titoloarticolo" name="titoloarticolo" value="<?php echo $articolo["titoloarticolo"]; ?>" />
                </li>
                <li>
                    <label for="testoarticolo">Testo Articolo:</label><textarea id="testoarticolo" name="testoarticolo"><?php echo $articolo["testoarticolo"]; ?></textarea>
                </li>
                <li>
                    <label for="anteprimaarticolo">Anteprima Articolo:</label><textarea id="anteprimaarticolo" name="anteprimaarticolo"><?php echo $articolo["anteprimaarticolo"]; ?></textarea>
                </li>
                <li>
                    <?php if($templateParams["azione"]!=3): ?>
                    <label for="imgarticolo">Immagine Articolo</label><input type="file" name="imgarticolo" id="imgarticolo" />
                    <?php endif; ?>
                    <?php if($templateParams["azione"]!=1): ?>
                    <img src="<?php echo UPLOAD_DIR.$articolo["imgarticolo"]; ?>" alt="" />
                    <?php endif; ?>
                </li>
                <li>
                    <?php foreach($templateParams["categorie"] as $categoria): ?>
                    <input type="checkbox" id="<?php echo $categoria["idcategoria"]; ?>" name="categoria_<?php echo $categoria["idcategoria"]; ?>" <?php 
                        if(in_array($categoria["idcategoria"], $articolo["categorie"])){ 
                            echo ' checked="checked" '; 
                        } 
                    ?> /><label for="<?php echo $categoria["idcategoria"]; ?>"><?php echo $categoria["nomecategoria"]; ?></label>
                    <?php endforeach; ?>
                </li>
                <li>
                    <input type="submit" name="submit" value="<?php echo $azione; ?> Articolo" />
                    <a href="login.php">Annulla</a>
                </li>
            </ul>
                <?php if($templateParams["azione"]!=1): ?>
                <input type="hidden" name="idarticolo" value="<?php echo $articolo["idarticolo"]; ?>" />
                <input type="hidden" name="categorie" value="<?php echo implode(",", $articolo["categorie"]); ?>" />
                <input type="hidden" name="oldimg" value="<?php echo $articolo["imgarticolo"]; ?>" />
                <?php endif;?>

                <input type="hidden" name="action" value="<?php echo $templateParams["azione"]; ?>" />
            <?php endif;?>
        </form>