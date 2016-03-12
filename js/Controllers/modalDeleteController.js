(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.modalController', modalController);

	modalController.$inject = [
		'$uibModalInstance', 
		'$location',
		'$anchorScroll',
		'toaster',
		'crudProject.Service.deleteUserService',
		'crudProject.Factory.sharedDataFactory'
	];

	function modalController($uibModalInstance,
							 $location,
							 $anchorScroll,
							 toaster,  
						 	 deleteUserService,
						 	 sharedDataFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

		vm.user = sharedDataFactory.detailPerson;
		vm.deleteConfirm = deleteConfirm;
		vm.cancel = cancel;

		//############ Public Functions ###################

		function deleteConfirm(id){

			var data = {"id": id};

			deleteUserService.deleteUser(data).then(
				function (data){

					_showToaster('success', 'Done', data.Message);
					$uibModalInstance.dismiss('cancel');
				},
				function (err){

					_showToaster('error', 'Error', err);

				}
			);
		};

		function cancel(){
			
			$uibModalInstance.dismiss('cancel');
		};

		//############ Private Functions ###################

		function _showToaster(typeMessage, title, message) {
            $location.hash('modalForm');
            $anchorScroll();
            toaster.pop(typeMessage, title, message);
        };
	};

})();