(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.UserDetailController', UserDetailController);

	UserDetailController.$inject = [
		'$stateParams'
	];
	
	function UserDetailController($stateParams)
	{
		var vm = this;

		console.log($stateParams);
		console.log($stateParams.userDetail);

		vm.userDetail = $stateParams;

	};	

})();