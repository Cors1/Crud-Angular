<?php 

    class UserBLL implements IUserBLL
    {
        //##### Fields

        //##### Public methods

        public function GetAllUsers()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_userDAL = new UserDAL();
                
                $responseDTO = $_userDAL->GetAllUsers();
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("Ocurrió un problema mientras se obtenían los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetUserById()
        {

        }

        public function AddUser($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_userDAL = new UserDAL();
                
                $responseDTO = $this->ValidateUser($userObj);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->GetImageContent($userObj);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_userDAL->AddUser($userObj);
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("Ocurrió un problema mientras se obtenían los datos", $e->getMessage());
            }

            return $responseDTO;
        }

        public function UpdateUserById()
        {

        }

        public function DeleteUserById()
        {
            
        }

        //##### Private methods

        private function ValidateUser($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userObj == null)
                {
                    $responseDTO->SetMessageErrorAndStackTrace("Los datos vienen vacíos", "El objeto viene nulo");
                    return $responseDTO;
                }

                if($userObj->Name == null)
                {
                    $responseDTO->SetMessageError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }

                if($userObj->Surname == null)
                {
                    $responseDTO->SetMessageError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }

                if($userObj->Age == null)
                {
                    $responseDTO->SetMessageError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }

                if($userObj->Email == null)
                {
                    $responseDTO->SetMessageError("El campo Nombre no puede estar vacío");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageError("Ocurrió un problema mientras se validaban los datos", $e->getMessage());
            }

            return $responseDTO;
        }
        
        private function GetImageContent($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $content = file_get_contents($userObj->Image['tmp_name']);
		        $fileUrl = "Server/tmp/".$fileName;
                $fp = fopen("../tmp/".$userObj->Image['name'], "w");
                fwrite($fp, $content);
                fclose($fp);

                $userObj->Image = $fileUrl;
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("Ocurrió un problema mientras se obtenían los datos", $e->getMessage());
            }

            return $responseDTO;
        }
    }
?>