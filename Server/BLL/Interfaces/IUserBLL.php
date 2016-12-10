<?php 

    interface IUserBLL
    {
        public function GetAllUsers();
        public function GetUserById($userObj);
        public function AddUser($userObj);
        public function UpdateUserById($userObj);
        public function DeleteUserById($userObj);
    }
?>