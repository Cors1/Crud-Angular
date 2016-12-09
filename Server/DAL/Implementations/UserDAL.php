<?php 

    class UserDAL
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
                $responseDTO = $this->AddCurrentUser($userObj);
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

                $query = "SELECT * FROM clientes ORDER BY id";
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
                $responseDTO->SetMessageErrorAndStackTrace("Ocurrió un problema mientras se obtenían los datos", $e->getMessage());
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

                $query = "INSERT INTO clientes (id, name, surname, age, email, image) VALUES (:id, :name, :surname, :age, :email, :image)";
		        $q = $dataBaseServicesBLL->connection->prepare($query);
		        $q->execute(array(':id' => NULL, 
				        		  ':name' => $currentUserObj->Name,
						          ':surname' => $currentUserObj->Surname,
						          ':age' => $currentUserObj->Age,
						          ':email' => $currentUserObj->Email,
						          ':image' => $currentUserObj->Image));

        		$responseDTO->UIMessage = "Contact Saved";

                $dataBaseServicesBLL->connection = null;    
            }
            catch (Exception $e)
            {
                $responseDTO->SetMessageErrorAndStackTrace("There was an error trying to save data", $e->getMessage());
            }

            return $responseDTO;
        }
    }
?>