<?php 

	include_once("../Utils/Response/ResponseDTO.php");
	include_once("../BLL/Interfaces/IDataBaseServicesBLL.php");
	include_once("../BLL/Implementations/DataBaseServicesBLL.php");
	include_once("../BLL/Interfaces/IUserBLL.php");
	include_once("../DAL/Interfaces/IUserDAL.php");
	include_once("../DAL/Implementations/UserDAL.php");
	include_once("../BLL/Implementations/UserBLL.php");
	include_once("../DTO/UserDTO.php");

	$responseDTO = new ResponseDTO();

	try
	{
		$userBLL = new UserBLL();

		$responseDTO = $userBLL->GetAllUsers(); 
	}
	catch (Exception $e)
	{
		$responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get users", $e->getMessage());
	}

	echo json_encode($responseDTO);
?>