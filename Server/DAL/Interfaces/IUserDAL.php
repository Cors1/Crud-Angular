<?php 

    interface IUserDAL
    {
        public function GetAllUsers();
        public function GetUserById($userObj);
        public function AddUser($userObj);
        public function UpdateUserById($userObj);
        public function DeleteUserById($userObj);
        public function ValidateLastRecordToResetAutoIncement();
    }
?>