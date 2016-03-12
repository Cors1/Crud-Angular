(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.PersonToDeleteController', PersonToDeleteController);

	PersonToDeleteController.$inject = [
		'$state', 
		'$location',
		'$anchorScroll',
		'toaster', 
		'crudProject.Service.deleteUserService',
		'crudProject.Factory.sharedDataFactory'
	];	

	function PersonToDeleteController($state, 
						  			  $location,
									  $anchorScroll,
									  toaster,
									  deleteUserService,
									  sharedDataFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.deleteUsersform = sharedDataFactory.detailPerson;
		vm.deleteConfirm = deleteConfirm;

		//############ Public Functions ###################

		function deleteConfirm(id){

			var data = {"id": id};

			deleteUserService.deleteUser(data).then(
				function (data){

					_showToaster('success', 'Done', data.Message);
					$state.go('delete');
				},
				function (err){

					_showToaster('error', 'Error', err);
					$state.go('delete');
				}
			);

		};

		//############ Private Functions ###################

		function _showToaster(typeMessage, title, message) {
            $location.hash('delete');
            $anchorScroll();
            toaster.pop(typeMessage, title, message);
        };
	};

})();