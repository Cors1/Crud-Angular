(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.updatePersonController', updatePersonController);

	updatePersonController.$inject = [
		'toaster',
		'$location',
		'$anchorScroll',
		'crudProject.Service.updateUserService'
	];	

	function updatePersonController(toaster, 
							  		$location, 
							  		$anchorScroll,
							  		updateUserService)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.searchUser = searchUser;
		vm.updateUser = updateUser;
		vm.rootUpdateObj = {
			id: '',
			name: '',
			surname: '',
			age: '',
			email: ''
		};

		//############ Public Functions ###################

		function searchUser(){

			var data = {"id": vm.rootUpdateObj.id};

			updateUserService.getUserData(data).then(
				function(data){

					if(data == 1){
						_showToaster('info', 'Info', 'Person Not Found');
						vm.rootUpdateObj.id = "";
						return;
					}

					vm.rootUpdateObj.name = data[0].name;
					vm.rootUpdateObj.surname = data[0].surname;
					vm.rootUpdateObj.age = data[0].age;
					vm.rootUpdateObj.email = data[0].email;	
				}, 
				function(err){
					_showToaster('error', 'Error', err);
				}
			);
		};

		function updateUser(){

			updateUserService.updateUser(vm.rootUpdateObj).then(
				function (info){
					_showToaster('success', 'Done', info.Message);
					
				}, function (err){
					_showToaster('error', 'Error', err);
				}
			);

			vm.rootUpdateObj = {
				id: '',
				name: '',
				surname: '',
				age: '',
				email: ''
			};
		};

		//############ Private Functions ###################

		function _showToaster(typeMessage, title, message) {
            $location.hash('formUpdateUsers');
            $anchorScroll();
            toaster.pop(typeMessage, title, message);
        };

	};

})();