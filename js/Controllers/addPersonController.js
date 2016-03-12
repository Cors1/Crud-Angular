(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.addPersonController', addPersonController);

	addPersonController.$inject = [
		'$location',
		'$anchorScroll',
		'toaster', 
		'crudProject.Service.addUserService'
	];
	
	function addPersonController($location,
								 $anchorScroll,
								 toaster, 
								 addUserService)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.addUser = addUser;
		vm.rootAddUser = {
			name : '',
			surname: '',
			age: '',
			email: '',
			profilePicture: {}
		};
		
		//############ Public Functions ###################

		function addUser(){

			addUserService.addNewUser(vm.rootAddUser).then(
				function(data){
					_showToaster('success', 'Done', data.ResponseMessage);
					vm.rootAddUser = {
						name : '',
						surname: '',
						age: '',
						email: '',
						profilePicture: {}
					};
				},
				function(err){
					_showToaster('error', 'Error', err.ResponseMessage);
					vm.rootAddUser = {
						name : '',
						surname: '',
						age: '',
						email: '',
						profilePicture: {}
					};
				}
			);
		};

		//############ Private Functions ###################

		function _showToaster(typeMessage, title, message) {
            $location.hash('formaddUsers');
            $anchorScroll();
            toaster.pop(typeMessage, title, message);
        };
	};	

})();