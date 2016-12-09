(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.CreateUserController', CreateUserController);

	CreateUserController.$inject = [
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory',
		'CRUD.AngularPrj.UserModel'
	];
	
	function CreateUserController(UtilsFactory,
								  UserModel)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel();
		
		vm.AddUser = AddUser;
		
		//############ Public Functions ###################

		function AddUser(){

			vm.userModel.AddUser().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						return;
					}

					UtilsFactory.ShowSuccessMessage(responseDTO.UIMessage);
					ClearAddUserForm();
				},
				error => {
					UtilsFactory.ShowErrorMessage('There was an error getting data');
					ClearAddUserForm();
				}
			);
		}

		//############ Private Functions ###################

		
		function ClearAddUserForm()
		{
			vm.userModel = new UserModel();
		}
	}

})();