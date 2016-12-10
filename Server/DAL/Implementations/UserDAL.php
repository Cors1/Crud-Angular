<?php 

    class UserDAL implements IUserDAL
    {
        //##### Public Methods

        public function GetAllUsers()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->GetUsers();
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
                $responseDTO = $this->GetUserInfoById($userObj);
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
                $responseDTO = $this->AddCurrentUser($userObj);
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to save user data", $e->getMessage());
            }

            return $responseDTO;
        }

        public function UpdateUserById($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $responseDTO = $this->UpdateUserInfoById($userObj);
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
                $responseDTO = $this->DeleteUserInfoById($userObj);
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $responseDTO = $this->ValidateLastRecordToResetAutoIncement();
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to update user by id", $e->getMessage());
            }

            return $responseDTO;
        }

        public function ValidateLastRecordToResetAutoIncement()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "SELECT * FROM clients ORDER BY id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute();

                //Recuperar los registros de la BD
                $result = $q->fetchAll();	

                if($result == null)
                {
                    $query = "ALTER TABLE clients AUTO_INCREMENT = 1";
                    $q = $dataBaseServicesBLL->connection->prepare($query);
                    $q->execute();
                    $responseDTO->UIMessage="User Deleted";
                } 
                
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to validate records", $e->getMessage());
            }

            return $responseDTO;
        }

        //##### Private Methods

        private function GetUsers()
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "SELECT * FROM clients ORDER BY id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute();

                //Recuperar los registros de la BD
                $result = $q->fetchAll();	

                $usersList = array();
                while ($row = array_shift($result)) 
                {
                    $user = new User();

                    $user->Id = $row['id'];
                    $user->Name = $row['name'];
                    $user->Surname = $row['surname'];
                    $user->Age = $row['age'];
                    $user->Email = $row['email'];
                    $user->Image = $row['image'];

                    array_push($usersList, $user);
                };

                if($usersList == null)
                {
                    $responseDTO->SetMessageError("There are not users");
                    return $responseDTO;
                } 
                
                $responseDTO->ResponseData = $usersList;

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get users list", $e->getMessage());
            }

            return $responseDTO;
        }

        private function AddCurrentUser($currentUserObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "INSERT INTO clients (id, name, surname, age, email, image) VALUES (:id, :name, :surname, :age, :email, :image)";
		        $q = $dataBaseServicesBLL->connection->prepare($query);
		        $q->execute(array(':id' => NULL, 
				        		  ':name' => $currentUserObj->Name,
						          ':surname' => $currentUserObj->Surname,
						          ':age' => $currentUserObj->Age,
						          ':email' => $currentUserObj->Email,
						          ':image' => $currentUserObj->Image));

        		$responseDTO->UIMessage = "User added";

                $dataBaseServicesBLL->connection = null;    
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to save data", $e->getMessage());
            }

            return $responseDTO;
        }

        private function GetUserInfoById($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "SELECT * FROM clients WHERE id = :id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute(array(':id' => $userObj->Id));

                //Get records in the DB
                $result = $q->fetchAll();	

                $usersList = array();
                while ($row = array_shift($result)) 
                {
                    $user = new User();

                    $user->Id = $row['id'];
                    $user->Name = $row['name'];
                    $user->Surname = $row['surname'];
                    $user->Age = $row['age'];
                    $user->Email = $row['email'];
                    $user->Image = $row['image'];

                    array_push($usersList, $user);
                };

                if($usersList == null)
                {
                    $responseDTO->SetMessageError("There are not users");
                    return $responseDTO;
                } 
                
                $responseDTO->ResponseData = $usersList;

                $dataBaseServicesBLL->connection = null;
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to get users list", $e->getMessage());
            }

            return $responseDTO;
        }

        private function UpdateUserInfoById($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "UPDATE clients SET name = :name, surname = :surname, age = :age, email = :email WHERE id = :id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute(array(':id' => $userObj->Id,
                                  ':name' => $userObj->Name,
                                  ':surname' => $userObj->Surname,
                                  ':age' => $userObj->Age,
                                  ':email' => $userObj->Email));

        		$responseDTO->UIMessage = "User updated";

                $dataBaseServicesBLL->connection = null;    
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to update user by id", $e->getMessage());
            }

            return $responseDTO;
        }

        private function DeleteUserInfoById($userObj)
        {
            $responseDTO = new ResponseDTO();

            try
            {
                $dataBaseServicesBLL = new DataBaseServicesBLL();

                $responseDTO = $dataBaseServicesBLL->InitializeDataBaseConnection();
                if($responseDTO->HasError)
                {
                    return $responseDTO;
                }

                $query = "DELETE FROM clients WHERE id = :id";
                $q = $dataBaseServicesBLL->connection->prepare($query);
                $q->execute(array(':id' => $userObj->Id));

        		$responseDTO->UIMessage = "User deleted";

                $dataBaseServicesBLL->connection = null;    
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to delete user by id", $e->getMessage());
            }

            return $responseDTO;
        }
    }
?>