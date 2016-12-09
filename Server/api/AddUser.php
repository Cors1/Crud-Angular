<?php 

	include_once("../Utils/Response/ResponseDTO.php");
	include_once("../BLL/Interfaces/IDataBaseServicesBLL.php");
	include_once("../BLL/Implementations/DataBaseServicesBLL.php");
	include_once("../BLL/Interfaces/IUserBLL.php");
	include_once("../DAL/Implementations/UserDAL.php");
	include_once("../BLL/Implementations/UserBLL.php");
	include_once("../DTO/UserDTO.php");

	$responseDTO = new ResponseDTO();
	$userBLL = new UserBLL();

	try
	{ 		
		$requestDTO->Name = $_POST['Name'];
		$requestDTO->Surname = $_POST['Surname'];
		$requestDTO->Age = $_POST['Age'];
		$requestDTO->Email = $_POST['Email'];
		$requestDTO->Image = $_FILES['file'];

		$responseDTO = $userBLL->AddUser($requestDTO); 
	}
	catch (Exception $e)
	{
		$responseDTO->SetMessageErrorAndStackTrace("Ocurrió un problema mientras se guardaban los datos", $e->getMessage());
	}

	echo json_encode($responseDTO);
?>