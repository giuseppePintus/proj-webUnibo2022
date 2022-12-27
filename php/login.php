<?php
session_start();
//connection info
$DB_NAME= '';
$DB_USER='';
$DB_PASS='';
$DB_HOST='';

//connection to database
$connection = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if(mysqli_connect_errno()){
    exit('connection to database failed: ' . mysqli_connect_error());
}


//check for input by user
if ( !isset($_POST['username']) ) {
	exit('Please enter your username');
}
if ( !isset($_POST['password']) ) {
	exit('Please enter your password');
}




?>