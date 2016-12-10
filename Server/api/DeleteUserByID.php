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

	try
	{
		$userBLL = new UserBLL();

		$requestJson = file_get_contents("php://input");
		$requestObj = json_decode($requestJson);

		$responseDTO = $userBLL->DeleteUserById($requestObj); 
	}
	catch (Exception $e)
	{
		$responseDTO->SetMessageErrorAndStackTrace("There was an error trying to delete user by id", $e->getMessage());
	}

	echo json_encode($responseDTO);
?>