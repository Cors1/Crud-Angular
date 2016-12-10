(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.ReadUserController', ReadUserController);

	ReadUserController.$inject = [
		'$state', 
		'$uibModal',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory',
		'CRUD.AngularPrj.UserModel',
		'CRUD.AngularPrj.CommonServicesFactory'
	];
	
	function ReadUserController($state, 
								$uibModal, 
								UtilsFactory,
								UserModel,
								CommonServicesFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel();

		vm.UserDetail = UserDetail;
		vm.DeleteUser = DeleteUser;

		//############ Public Functions ###################

		function UserDetail(userObj)
		{
			$state.go('app.read.detail', {userDetail: userObj});
		}

		function DeleteUser(userDetailObj)
		{
			var modalInstance = $uibModal.open(
				{
					templateUrl: 'Client/Templates/read/modalDeleteConfirm.html',
					controller: 'CRUD.AngularPrj.ModalDeleteController',
					controllerAs: 'vm',
					resolve: {
						UserDetail: userDetailObj
					}
				}
			);

		}

		//############ Private Functions ###################

		function Initialize()
		{
			CommonServicesFactory.GetAllUsers().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						return;
					}

					vm.userModel.UsersList = responseDTO.ResponseData;
				},
				error => 
				{
					UtilsFactory.ShowErrorMessage('There was an error getting data');
					console.log(error);
				}
			);
		}

		Initialize();
	}

})();