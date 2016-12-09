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

		vm.userDetail = {};

		function Initialize()
		{
			vm.userDetail = $stateParams.userDetail;
		}

		Initialize();
	}

})();