<?php  
	require('DBConnection/bdConnection.php');
	require('Headers/headers.php');
	require('Class/DTO/ResponseDTO.php');

	$dataRequest = file_get_contents("php://input");
	$objectToDelete = json_decode($dataRequest);
	$responseDTO = new ResponseDTO();

	$query = "DELETE FROM clientes WHERE id = :id";
	$q = $con->prepare($query);
	$q->execute(array(':id' => $objectToDelete->id));

	$arr = array(
		"Result" => 1,
		"Message" => "Person Deleted"
		);

	echo json_encode($arr);
	$con = null;
?>