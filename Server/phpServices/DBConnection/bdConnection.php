<?php  
	$user = 'root';
	$pass = 'felipe0025';

	$con = new PDO('mysql:host=localhost; dbname=crud_angular', $user, $pass) or die ("Error to make the connection with the data base");
?>