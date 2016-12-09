(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.ReadUserController', ReadUserController);

	ReadUserController.$inject = [
		'$state', 
		'$uibModal',
		'CRUD.AngularPrj.Blocks.Utils',
		'CRUD.AngularPrj.UserModel',
		'CRUD.AngularPrj.ReadUserFactory'
	];
	
	function ReadUserController($state, 
								$uibModal, 
								Utils,
								UserModel,
								ReadUserFactory)
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
			ReadUserFactory.GetAllUsers().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						Utils.ShowErrorMessage(responseDTO.UIMessage);
						return;
					}

					vm.userModel.UsersList = responseDTO.ResponseData;
				},
				error => {
					alert('There was an error getting data');
					console.log(error);
				}
			);
		}

		Initialize();
	};	

})();