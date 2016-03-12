(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.controller('crudProject.Controller.PersonDetailController', detailPersonController);

	detailPersonController.$inject = [
		'crudProject.Factory.sharedDataFactory'
	];
	
	function detailPersonController(sharedDataFactory){

		var vm = this;

		vm.user = sharedDataFactory.detailPerson;

	};	

})();