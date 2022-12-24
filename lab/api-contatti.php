<?php
require_once 'bootstrap.php';
$articoli = $dbh->getAuthors();

header('Content-Type: application/json');
echo json_encode($articoli);
?>