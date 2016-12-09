(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.ModalDeleteController', ModalDeleteController);

	ModalDeleteController.$inject = [
		'$uibModalInstance', 
		'UserDetail',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory'
	];

	function ModalDeleteController($uibModalInstance,
								   UserDetail,
								   UtilsFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userDetail = UserDetail;

		vm.DeleteUserById = DeleteUserById;
		vm.CancelDeleteUser = CancelDeleteUser;

		//############ Public Functions ###################

		function DeleteUserById(id)
		{
			vm.userDetail.DeleteUserById().then(
				function (data)
				{
					UtilsFactory.ShowSuccessMessage(data.Message);
					$uibModalInstance.dismiss('cancel');
				},
				function (err)
				{
					UtilsFactory.ShowErrorMessage(err);
				}
			);
		}

		function CancelDeleteUser()
		{	
			$uibModalInstance.dismiss('cancel');
		}

		//############ Private Functions ###################
	}
})();