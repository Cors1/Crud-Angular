(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.DeleteUserController', DeleteUserController);

	DeleteUserController.$inject = [
		'$state', 
		'CRUD.AngularPrj.UserModel',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory'
	];
	
	function DeleteUserController($state,
							  	  UserModel,
								  UtilsFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel();

		vm.GetUserInfoById = GetUserInfoById;
		vm.GoToUserDetail = GoToUserDetail;

		//############ Public Functions ###################	

		function GetUserInfoById()
		{
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
				function(err)
				{
					UtilsFactory.ShowErrorMessage(err);
				}
			);	
		}

		function GoToUserDetail(userDetailObj)
		{
			$state.go('app.delete.deleteconfirm',
				{
					userDetail: userDetailObj
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