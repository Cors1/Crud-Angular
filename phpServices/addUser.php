<?php  
	require('DBConnection/bdConnection.php');
	require('Headers/headers.php');
	require('Class/DTO/ResponseDTO.php');

	$name = $_POST['name'];
	$surname = $_POST['surname'];
	$age = $_POST['age'];
	$email = $_POST['email'];
	$file = addslashes(file_get_contents($_FILES['file']['tmp_name']));
	$responseDTO = new ResponseDTO();

	try 
	{
		$query = "INSERT INTO clientes (id, name, surname, age, email, image) VALUES (:id, :name, :surname, :age, :email, '$file')";
		$q = $con->prepare($query);
		$q->execute(array(':id' => NULL, 
						  ':name' =>$name,
						  ':surname' =>$surname,
						  ':age' =>$age,
						  ':email' =>$email));

		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = "Contact Saved";				   
	} 
	catch (Exception $e) 
	{
		$responseDTO->Result = 0;
		$responseDTO->ResponseMessage = $e->$getMessage();
	}
	
	echo json_encode($responseDTO);
	$con = null;
?>