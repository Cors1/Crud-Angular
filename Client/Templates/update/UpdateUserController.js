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
		
		vm.GetUserInfoById = GetUserInfoById;
		vm.UpdateUserById = UpdateUserById;

		//############ Public Functions ###################

		function GetUserInfoById(){

			vm.userModel.GetUserInfoById().then(
				function(data)
				{
					if(data == 1)
					{
						UtilsFactory.ShowErrorMessage('User not found');
						ClearUserModel();
						return;
					}

					vm.userModel = new UserModel(data[0]);
				}, 
				function(err){
					UtilsFactory.ShowErrorMessage(err);
					ClearUserModel();
				}
			);
		}

		function UpdateUserById(){
			
			vm.userModel.UpdateUserById().then(
				function(data)
				{
					UtilsFactory.ShowSuccessMessage(data.Message);
					ClearUserModel();
				}, 
				function(err)
				{
					UtilsFactory.ShowErrorMessage(err);
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