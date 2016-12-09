(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.factory('CRUD.AngularPrj.UserModel', UserModel);

	UserModel.$inject = [
		'CRUD.AngularPrj.AddUserFactory',
        'CRUD.AngularPrj.UpdateUserFactory',
        'CRUD.AngularPrj.ReadUserFactory',
        'CRUD.AngularPrj.DeleteUserFactory'
	];	

	function UserModel(AddUserFactory,
                       UpdateUserFactory,
                       ReadUserFactory,
                       DeleteUserFactory)
	{
        var Model = function(dataDTO)
        {
            var _self = this;

            angular.extend(this, {

                Name : 'felipe',
                Surname: 'tavera',
                Age: 21,
                Email: 'lftavera@hotmail.com',
                ProfilePicture: {},
                UsersList: [],

                AddUser: AddUser,
                GetUserInfoById: GetUserInfoById,
                GetAllUsers: GetAllUsers,
                UpdateUserById: UpdateUserById,
                DeleteUserById: DeleteUserById

            }, dataDTO);

            function AddUser()
            {
                return AddUserFactory.AddNewUser(_self);
            }

            function GetUserInfoById()
            {
                return UpdateUserFactory.GetUserInfoById(
                    {
                        id: _self.Id
                    }
                );
            }

            function GetAllUsers()
            {
                return ReadUserFactory.GetAllUsers();
            }

            function UpdateUserById()
            {
                return UpdateUserFactory.UpdateUserById(_self);
            }

            function DeleteUserById()
            {
                return DeleteUserFactory.DeleteUserById(
                    {
                        id: _self.Id
                    }
                );
            }
        };

		return Model;
	}

})();