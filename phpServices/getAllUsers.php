<?php  
	require('DBConnection/bdConnection.php');
	require('Headers/headers.php');
	require('Class/UserClass.php');
	require('Class/DTO/ResponseDTO.php');

	$query = "SELECT * FROM clientes ORDER BY id";
	$q = $con->prepare($query);
	$q->execute();

	//Recuperar los registros de la BD
	$result = $q->fetchAll();	

	$arrayMessages = array();
	while ($row = array_shift($result)) {
		$objectData = new Users();

		$objectData->id = $row['id'];
		$objectData->name = $row['name'];
		$objectData->surname = $row['surname'];
		$objectData->age = $row['age'];
		$objectData->email = $row['email'];
		$objectData->image = base64_encode($row['image']);

		array_push($arrayMessages, $objectData);
	};

	if($arrayMessages == null){

		echo "1";

	} else {
		echo json_encode($arrayMessages);
	}

	$con = null;
?>