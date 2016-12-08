(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.DetailUserToDeleteController', DetailUserToDeleteController);

	DetailUserToDeleteController.$inject = [
		'$state', 
		'$stateParams',
		'CRUD.AngularPrj.Blocks.Utils'
	];	

	function DetailUserToDeleteController($state, 
						  			  	  $stateParams,
										  Utils)
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
					Utils.ShowSuccessMessage(data.Message);
					$state.go('app.delete');
				},
				function (err)
				{
					Utils.ShowErrorMessage(err);
					$state.go('app.delete');
				}
			);

		};

		//############ Private Functions ###################

	};

})();