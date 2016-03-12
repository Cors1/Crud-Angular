<?php  
	$user = 'root';
	$pass = 'felipe0025';
	$bd = 'pruebas';

	$con = new PDO('mysql:host=localhost; dbname=pruebas', $user, $pass) or die ("Error to make the connection with the data base");
?>