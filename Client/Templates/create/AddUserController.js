(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.CreateUserController', CreateUserController);

	CreateUserController.$inject = [
		'CRUD.AngularPrj.Blocks.Utils',
		'CRUD.AngularPrj.UserModel'
	];
	
	function CreateUserController(Utils,
								  UserModel)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel();
		
		vm.AddUser = AddUser;
		
		//############ Public Functions ###################

		function AddUser(){

			vm.userModel.AddUser().then(
				function(data)
				{
					Utils.ShowSuccessMessage(data.ResponseMessage);
					ClearAddUserForm();
				},
				function(err)
				{
					Utils.ShowErrorMessage(err.ResponseMessage || err);
					ClearAddUserForm();
				}
			);
		};

		//############ Private Functions ###################

		
		function ClearAddUserForm()
		{
			vm.userModel = new UserModel();
		}
	};	

})();