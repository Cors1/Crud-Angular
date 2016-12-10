(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.ModalDeleteController', ModalDeleteController);

	ModalDeleteController.$inject = [
		'$uibModalInstance', 
		'UserDetail',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory',
		'CRUD.AngularPrj.UserModel'
	];

	function ModalDeleteController($uibModalInstance,
								   UserDetail,
								   UtilsFactory,
								   UserModel)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = {};

		vm.DeleteUserById = DeleteUserById;
		vm.CancelDeleteUser = CancelDeleteUser;

		//############ Public Functions ###################

		function DeleteUserById()
		{
			vm.userModel.DeleteUserById().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						$uibModalInstance.dismiss('cancel');
						return;
					}

					UtilsFactory.ShowSuccessMessage(responseDTO.UIMessage);
					$uibModalInstance.dismiss('cancel');
				},
				error => 
				{
					UtilsFactory.ShowErrorMessage('There was an error getting data');
					console.log(error);
					$uibModalInstance.dismiss('cancel');
				}
			);
		}

		function CancelDeleteUser()
		{	
			$uibModalInstance.dismiss('cancel');
		}

		//############ Private Functions ###################

		function Initialize()
		{
			vm.userModel = new UserModel(UserDetail);
		}

		Initialize();
	}
})();