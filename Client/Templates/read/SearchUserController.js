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
		'GetListUsers'
	];
	
	function ReadUserController($state, 
								$uibModal, 
								Utils,
								UserModel,
								GetListUsers)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.userModel = new UserModel();

		
		if(GetListUsers == 1)
		{
			Utils.ShowErrorMessage('There are 0 records to show');
		}
		else 
		{
			vm.userModel.UsersList = GetListUsers;
		}

		vm.UserDetail = UserDetail;
		vm.DeleteUser = DeleteUser;

		//############ Public Functions ###################

		function UserDetail(userObj){

			$state.go('app.read.detail', {
				userDetail: userObj
			});

		};

		function DeleteUser(userDetailObj){

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

		};

		//############ Private Functions ###################

	};	

})();