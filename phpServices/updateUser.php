<?php  
	require('DBConnection/bdConnection.php');
	require('Headers/headers.php');
	require('Class/DTO/ResponseDTO.php');

	$dataInfo = file_get_contents("php://input");
	$objectUpdate = json_decode($dataInfo);

	$query = "UPDATE clientes SET name = :name, surname = :surname, age = :age, email = :email WHERE id = :id";
	$q = $con->prepare($query);
	$q->execute(array(':id' => $objectUpdate->id,
					  ':name' => $objectUpdate->name,
					  ':surname' => $objectUpdate->surname,
					  ':age' => $objectUpdate->age,
					  ':email' => $objectUpdate->email));
	
	$arr = array(
		"Result" => 1,
		"Message" => "Person Updated"
		);
	
	echo json_encode($arr);

	$con = null;
?>