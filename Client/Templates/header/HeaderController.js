(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.HeaderController', HeaderController);

	HeaderController.$inject = [
		'GetListUsers'
	];
	
	function HeaderController(GetListUsers)
	{
		//############ Instance Properties ###################

		var vm = this;

        vm.usersCount = 0;
		
		//############ Public Functions ###################


		//############ Private Functions ###################

        function Initialize()
        {
            vm.usersCount = GetListUsers == 1 ? 0 : GetListUsers.length;
        }

		Initialize();

	};	

})();