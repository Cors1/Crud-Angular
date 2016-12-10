<?php 

	include_once("../BLL/Interfaces/IDataBaseServicesBLL.php");
	include_once("../BLL/Interfaces/IUserBLL.php");
	include_once("../DAL/Interfaces/IUserDAL.php");
	include_once("../BLL/Implementations/DataBaseServicesBLL.php");
	include_once("../DAL/Implementations/UserDAL.php");
	include_once("../BLL/Implementations/UserBLL.php");
	include_once("../Utils/Response/ResponseDTO.php");
	include_once("../DTO/UserDTO.php");

	$responseDTO = new ResponseDTO();
	$userBLL = new UserBLL();

	try
	{ 		
		$userDTO = new User();

		$userDTO->Name = $_POST['Name'];
		$userDTO->Surname = $_POST['Surname'];
		$userDTO->Age = $_POST['Age'];
		$userDTO->Email = $_POST['Email'];
		$userDTO->Image = $_FILES['Image'];

		$responseDTO = $userBLL->AddUser($userDTO); 
	}
	catch (Exception $e)
	{
		$responseDTO->SetMessageErrorAndStackTrace("There was an error trying to save data", $e->getMessage());
	}

	echo json_encode($responseDTO);
?>