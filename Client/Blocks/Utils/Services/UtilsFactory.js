(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.Blocks.Utils')
		.factory('CRUD.AngularPrj.Blocks.Utils.UtilsFactory', UtilsFactory);

	UtilsFactory.$inject = [
		'toaster'
	];
	
	function UtilsFactory(toaster)
	{
		var service = {
            ShowSuccessMessage: ShowSuccessMessage,
            ShowErrorMessage: ShowErrorMessage
        };
		
        return service;

		//############ Public Functions ###################

        function ShowSuccessMessage(successMessage)
        {
            var paramsObj = {
                Message: successMessage,
                MessageType: 'success',
                MessageTitle: 'Success'
            };

            ShowToasterMessage(paramsObj);
        }

        function ShowErrorMessage(errorMessage)
        {
            var paramsObj = {
                Message: errorMessage,
                MessageType: 'error',
                MessageTitle: 'Error'
            };

            ShowToasterMessage(paramsObj);
        }

		//############ Private Functions ###################

        function ShowToasterMessage(paramsObj)
        {
            toaster.pop(paramsObj.MessageType, paramsObj.MessageTitle, paramsObj.Message);
        }
	}	

})();