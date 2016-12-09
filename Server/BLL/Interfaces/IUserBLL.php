<?php 

    interface IUserBLL
    {
        public function GetAllUsers();
        public function GetUserById();
        public function AddUser($userObj);
        public function UpdateUserById();
        public function DeleteUserById();
    }
?>