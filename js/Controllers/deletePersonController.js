(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.PersonDeleteController', PersonDeleteController);

	PersonDeleteController.$inject = [
		'$state', 
		'$location',
		'$anchorScroll',
		'toaster',
		'crudProject.Service.deleteUserService',
		'crudProject.Factory.sharedDataFactory'
	];
	
	function PersonDeleteController($state,
							  		$location,
							  		$anchorScroll,
							  		toaster,  
							  		deleteUserService,
							  		sharedDataFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.searchUser = searchUser;
		vm.detailPerson = detailPerson;
		vm.rootDeleteUserObj = {
			id: '',
			name: '',
			surname: '',
			age: '',
			email: '',
			image: ''
		};

		//############ Public Functions ###################	

		function searchUser(){

			if(vm.userId == null)
			{
				_showToaster('info', 'Info', 'Please, type a number of id to search.');
				vm.rootDeleteUserObj = {
					id: '',
					name: '',
					surname: '',
					age: '',
					email: '',
					image: ''
				};
				return;
			} 

			var data = {"id": vm.userId};

			deleteUserService.searchUserToDelete(data).then(
				function(data){
					if(data == 1)
					{
						_showToaster('info', 'Info', 'Person Not Found');
						vm.userId = "";
						vm.rootDeleteUserObj = {
							id: '',
							name: '',
							surname: '',
							age: '',
							email: '',
							image: ''
						};
						return;
					} 

					vm.rootDeleteUserObj.id = data[0].id;
					vm.rootDeleteUserObj.name = data[0].name;
					vm.rootDeleteUserObj.surname = data[0].surname;
					vm.rootDeleteUserObj.age = data[0].age;
					vm.rootDeleteUserObj.email = data[0].email;
					vm.rootDeleteUserObj.image = data[0].image;
				}, 
				function(err){
					_showToaster('error', 'Error', err);
				}
			);		

		};

		function detailPerson(objPerson){

			if(vm.userId == '' || vm.userId == null)
			{
				_showToaster('info', 'Info', 'There are no users to delete');
				return;
			} 
			
			sharedDataFactory.detailPerson = objPerson;
			$state.go('deleteConfirm');

		};

		//############ Private Functions ###################

		function _showToaster(typeMessage, title, message) {
            $location.hash('formUpdateUsers');
            $anchorScroll();
            toaster.pop(typeMessage, title, message);
        };
	};	

})();		