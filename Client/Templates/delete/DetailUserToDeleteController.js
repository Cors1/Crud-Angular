(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.DetailUserToDeleteController', DetailUserToDeleteController);

	DetailUserToDeleteController.$inject = [
		'$state', 
		'$stateParams',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory'
	];	

	function DetailUserToDeleteController($state, 
						  			  	  $stateParams,
										  UtilsFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = $stateParams.userDetail;

		vm.DeleteUserByIdConfirm = DeleteUserByIdConfirm;

		//############ Public Functions ###################

		function DeleteUserByIdConfirm()
		{
			vm.userModel.DeleteUserById().then(
				function (data)
				{
					UtilsFactory.ShowSuccessMessage(data.Message);
					$state.go('app.delete');
				},
				function (err)
				{
					UtilsFactory.ShowErrorMessage(err);
					$state.go('app.delete');
				}
			);
		}

		//############ Private Functions ###################

	}

})();