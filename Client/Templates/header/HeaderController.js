(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.HeaderController', HeaderController);

	HeaderController.$inject = [
		'GetListUsers',
		'CRUD.AngularPrj.Blocks.Utils'
	];
	
	function HeaderController(GetListUsers,
							  Utils)
	{
		//############ Instance Properties ###################

		var vm = this;

        vm.usersCount = 0;
		
		//############ Public Functions ###################


		//############ Private Functions ###################

        function Initialize()
        {
			if(GetListUsers.HasError)
			{
				Utils.ShowErrorMessage(GetListUsers.UIMessage);
				return;
			}

            vm.usersCount = GetListUsers.ResponseData.length;
        }

		Initialize();

	};	

})();