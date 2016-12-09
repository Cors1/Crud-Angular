(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.factory('CRUD.AngularPrj.DeleteUserFactory', DeleteUserFactory);

	DeleteUserFactory.$inject = [
		'$http',  
		'$q', 
		'CRUD.AngularPrj.ProjectConstants'
	];
	
	function DeleteUserFactory($http, 
							   $q, 
							   ProjectConstants)
	{
		var _self = this;

		var service = {
			DeleteUserById: DeleteUserById
		};
			
		return service;

		//##### Public Methods #####

		function DeleteUserById(userId)
		{
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + "DeleteUser.php";

			$http.post(url, userId)
			.success(
				function(data)
				{
					defered.resolve(data);
				}
			)
			.error(
				function(err)
				{
					defered.reject(err);
				}
			);

			return defered.promise;
		}
	}

})();