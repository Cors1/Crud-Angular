(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.factory('CRUD.AngularPrj.UserModel', UserModel);

	UserModel.$inject = [
		'CRUD.AngularPrj.CommonServicesFactory'
	];	

	function UserModel(CommonServicesFactory)
	{
        var Model = function(dataDTO)
        {
            var _self = this;

            angular.extend(this, {

                //Attributes

                Id: null,
                Name : null,
                Surname: null,
                Age: null,
                Email: null,
                ProfilePicture: {},
                UsersList: [],

                //Methods

                AddUser: AddUser,
                GetUserInfoById: GetUserInfoById,
                GetAllUsers: GetAllUsers,
                UpdateUserById: UpdateUserById,
                DeleteUserById: DeleteUserById

            }, dataDTO);

            function AddUser()
            {
                return CommonServicesFactory.AddNewUser(_self);
            }

            function GetUserInfoById()
            {
                return CommonServicesFactory.GetUserInfoById(
                    {
                        Id: _self.Id
                    }
                );
            }

            function GetAllUsers()
            {
                return CommonServicesFactory.GetAllUsers();
            }

            function UpdateUserById()
            {
                return CommonServicesFactory.UpdateUserById(_self);
            }

            function DeleteUserById()
            {
                return CommonServicesFactory.DeleteUserById(
                    {
                        Id: _self.Id
                    }
                );
            }
        };

		return Model;
	}

})();