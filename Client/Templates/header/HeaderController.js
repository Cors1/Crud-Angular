(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.controller('CRUD.AngularPrj.HeaderController', HeaderController);

	HeaderController.$inject = [
		'CRUD.AngularPrj.ReadUserFactory',
		'CRUD.AngularPrj.Blocks.Utils'
	];
	
	function HeaderController(ReadUserFactory,
							  Utils)
	{
		//############ Instance Properties ###################

		var vm = this;

        vm.usersCount = 0;
		
		//############ Public Functions ###################


		//############ Private Functions ###################

        function Initialize()
        {
			ReadUserFactory.GetAllUsers().then(
				responseDTO =>
				{
					if(responseDTO.HasError)
					{
						Utils.ShowErrorMessage(responseDTO.UIMessage);
						return;
					}

					vm.usersCount = responseDTO.ResponseData.length;
				},
				error => {
					alert('There was an error getting data');
					console.log(error);
				}
			);
        }

		Initialize();

	};	

})();