(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.HeaderController', HeaderController);

	HeaderController.$inject = [
		'CRUD.AngularPrj.CommonServicesFactory',
		'CRUD.AngularPrj.Blocks.Utils.UtilsFactory'
	];
	
	function HeaderController(CommonServicesFactory,
							  UtilsFactory)
	{
		//############ Instance Properties ###################

		var vm = this;

        vm.usersCount = 0;
		
		//############ Public Functions ###################


		//############ Private Functions ###################

        function Initialize()
        {
			CommonServicesFactory.GetAllUsers().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						UtilsFactory.ShowErrorMessage(responseDTO.UIMessage);
						return;
					}

					vm.usersCount = responseDTO.ResponseData.length;
				},
				error => 
				{
					UtilsFactory.ShowErrorMessage('There was an error getting data');
					console.log(error);
				}
			);
        }

		Initialize();
	}

})();