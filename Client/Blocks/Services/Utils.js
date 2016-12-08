(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.Blocks')
		.factory('CRUD.AngularPrj.Blocks.Utils', Utils);

	Utils.$inject = [
		'toaster'
	];
	
	function Utils(toaster)
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
        }

        function ShowErrorMessage(errorMessage)
        {
            var paramsObj = {
                Message: errorMessage,
                MessageType: 'error',
                MessageTitle: 'Error'
            };
        }

		//############ Private Functions ###################

        function ShowToasterMessage(paramsObj)
        {
            toaster.pop(paramsObj.MessageType, paramsObj.MessageTitle, paramsObj.Message);
        }
	};	

})();