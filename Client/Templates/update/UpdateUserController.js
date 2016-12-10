(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.UpdateController', UpdateController);

	UpdateController.$inject = [
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory',
		'CRUD.AngularPrj.UserModel'
	];	

	function UpdateController(UtilsFactory,
							  UserModel)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel();
		vm.ShowUpdateForm = false;
		
		vm.GetUserInfoById = GetUserInfoById;
		vm.UpdateUserById = UpdateUserById;

		//############ Public Functions ###################

		function GetUserInfoById()
		{

			vm.userModel.GetUserInfoById().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						ClearUserModel();
						vm.ShowUpdateForm = false;
						return;
					}

					vm.userModel = new UserModel(responseDTO.ResponseData[0]);
					vm.ShowUpdateForm = true;
				},
				error => 
				{
					UtilsFactory.ShowErrorMessage('There was an error getting data');
					console.log(error);
					ClearUserModel();
					vm.ShowUpdateForm = false;
				}
			);
		}

		function UpdateUserById(){
			
			vm.userModel.UpdateUserById().then(
				responseDTO =>
				{
					ClearUserModel();

					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						return;
					}

					UtilsFactory.ShowSuccessMessage(responseDTO.UIMessage);
					vm.ShowUpdateForm = false;
				},
				error => 
				{
					UtilsFactory.ShowErrorMessage('There was an error trying to update data');
					console.log(error);
					ClearUserModel();
				}
			);
		}

		//############ Private Functions ###################

		function ClearUserModel()
		{
			vm.userModel = new UserModel();
		}
	}

})();