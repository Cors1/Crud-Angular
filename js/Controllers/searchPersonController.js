(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.searchPersonController', searchPersonController);

	searchPersonController.$inject = [
		'$state', 
		'$uibModal',
		'$location',
		'$anchorScroll',
		'toaster', 
		'crudProject.Factory.sharedDataFactory', 
		'getListUsers'
	];
	
	function searchPersonController($state, 
							  		$uibModal,
							  		$location,
							  		$anchorScroll,
							  		toaster, 
							  		sharedDataFactory, 
							  		getListUsers)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.detailPerson = detailPerson;
		vm.openModal = openModal;
		
		if(getListUsers == 1)
		{
			_showToaster('info', 'Info', 'There are 0 records to show');
		}else {
			vm.usersData = getListUsers;
		}

		//############ Public Functions ###################

		function detailPerson(objPerson){

			sharedDataFactory.detailPerson = objPerson;

			$state.go('details');

		};

		function openModal(objPersonData){

			sharedDataFactory.detailPerson = objPersonData;

			var modalInstance = $uibModal.open({
				templateUrl: 'views/modalConfirm.html',
				controller: 'crudProject.Controller.modalController',
				controllerAs: 'vm'
			});

		};

		//############ Private Functions ###################

		function _showToaster(typeMessage, title, message) {
            $location.hash('usersListSearch');
            $anchorScroll();
            toaster.pop(typeMessage, title, message);
        };

	};	

})();