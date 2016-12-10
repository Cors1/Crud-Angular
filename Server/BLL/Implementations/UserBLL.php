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
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get users", $e->getMessage());
            }

            return $responseDTO;
        }

        public function GetUserById($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_userDAL = new UserDAL();
                
                $responseDTO = $this->ValidateUserID($userObj);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_userDAL->GetUserById($userObj);
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get user by id", $e->getMessage());
            }

            return $responseDTO;
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
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to save user form", $e->getMessage());
            }

            return $responseDTO;
        }

        public function UpdateUserById($userObj)
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

                $responseDTO = $_userDAL->UpdateUserById($userObj);
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to update user by id", $e->getMessage());
            }

            return $responseDTO;
        }

        public function DeleteUserById($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $_userDAL = new UserDAL();
                
                $responseDTO = $this->ValidateUserID($userObj);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $_userDAL->DeleteUserById($userObj);
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to delete user by id", $e->getMessage());
            }

            return $responseDTO;
        }

        //##### Private methods

        private function ValidateUser($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userObj == null)
                {
                    $responseDTO->SetMessageErrorAndStackTrace("The data is empty", "Null object");
                    return $responseDTO;
                }

                if($userObj->Name == null)
                {
                    $responseDTO->SetMessageError("Field Name can not be empty");
                    return $responseDTO;
                }

                if($userObj->Surname == null)
                {
                    $responseDTO->SetMessageError("Field Surname can not be empty");
                    return $responseDTO;
                }

                if($userObj->Age == null)
                {
                    $responseDTO->SetMessageError("Field Age can not be empty");
                    return $responseDTO;
                }

                if($userObj->Email == null)
                {
                    $responseDTO->SetMessageError("Field Email can not be empty");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageError("There was an error trying to validate data", $e->getMessage());
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
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get content from image", $e->getMessage());
            }

            return $responseDTO;
        }

        private function ValidateUserID($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                if($userObj->Id == null)
                {
                    $responseDTO->SetMessageError("User Id can not be empty");
                    return $responseDTO;
                }
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageError("There was an error trying to validate data", $e->getMessage());
            }   

            return $responseDTO;
        }
    }
?>