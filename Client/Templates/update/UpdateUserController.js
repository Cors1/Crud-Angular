(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.UpdateController', UpdateController);

	UpdateController.$inject = [
		'CRUD.AngularPrj.Blocks.Utils',
		'CRUD.AngularPrj.UserModel'
	];	

	function UpdateController(Utils,
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
						Utils.ShowErrorMessage('User not found');
						ClearUserModel();
						return;
					}

					vm.userModel = new UserModel(data[0]);
				}, 
				function(err){
					Utils.ShowErrorMessage(err);
					ClearUserModel();
				}
			);
		};

		function UpdateUserById(){
			
			vm.userModel.UpdateUserById().then(
				function(data)
				{
					Utils.ShowSuccessMessage(data.Message);
					ClearUserModel();
				}, 
				function(err)
				{
					Utils.ShowErrorMessage(err);
					ClearUserModel();	
				}
			);
		};

		//############ Private Functions ###################

		function ClearUserModel()
		{
			vm.userModel = new UserModel();
		}
	};

})();