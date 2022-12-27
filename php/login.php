<?php
require_once 'utils/bootstrap.php';

function checkData()
{
    //check for input by user
    if ( !isset($_POST['username']) ) {
        exit('Please enter your username');
    }
    if ( !isset($_POST['password']) ) {
        exit('Please enter your password');
    }
}

?>