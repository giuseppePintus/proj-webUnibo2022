<?php
require_once 'bootstrap.php';
$articoli = $dbh->getPosts(2);

for($i = 0; $i < count($articoli); $i++){
    $articoli[$i]["imgarticolo"] = UPLOAD_DIR.$articoli[$i]["imgarticolo"];
}
header('Content-Type: application/json');
echo json_encode($articoli);
?>