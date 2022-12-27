        <section>
            <h2>Articoli</h2>
            <?php if(isset($templateParams["formmsg"])):?>
            <p><?php echo $templateParams["formmsg"]; ?></p>
            <?php endif; ?>
            <a href="gestisci-articoli.php?action=1">Inserisci Articolo</a>
            <table>
                <tr>
                    <th>Titolo</th><th>Immagine</th><th>Azione</th>
                </tr>
                <?php foreach($templateParams["articoli"] as $articolo): ?>
                <tr>
                    <td><?php echo $articolo["titoloarticolo"]; ?></td>
                    <td><img src="<?php echo UPLOAD_DIR.$articolo["imgarticolo"]; ?>" alt="" /></td>
                    <td>
                        <a href="gestisci-articoli.php?action=2&id=<?php echo $articolo["idarticolo"]; ?>">Modifica</a>
                        <a href="gestisci-articoli.php?action=3&id=<?php echo $articolo["idarticolo"]; ?>">Cancella</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </table>
        </section>