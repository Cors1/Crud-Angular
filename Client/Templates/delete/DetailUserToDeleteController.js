(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.DetailUserToDeleteController', DetailUserToDeleteController);

	DetailUserToDeleteController.$inject = [
		'$state', 
		'$stateParams',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory',
		'CRUD.AngularPrj.UserModel'
	];	

	function DetailUserToDeleteController($state, 
						  			  	  $stateParams,
										  UtilsFactory,
										  UserModel)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel($stateParams.userDetail);

		vm.DeleteUserByIdConfirm = DeleteUserByIdConfirm;

		//############ Public Functions ###################

		function DeleteUserByIdConfirm()
		{
			vm.userModel.DeleteUserById().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						$state.go('app.delete');
						return;
					}

					UtilsFactory.ShowSuccessMessage(responseDTO.UIMessage);
					$state.go('app.delete');
				},
				error => 
				{
					UtilsFactory.ShowErrorMessage('There was an error getting data');
					console.log(error);
					$state.go('app.delete');
				}
			);
		}

		//############ Private Functions ###################

	}

})();