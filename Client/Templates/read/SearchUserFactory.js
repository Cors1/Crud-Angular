(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.factory('CRUD.AngularPrj.ReadUserFactory', ReadUserFactory);

	ReadUserFactory.$inject = [
		'$http',  
		'$q', 
		'CRUD.AngularPrj.ProjectConstants'
	];
	
	function ReadUserFactory($http,  
							 $q, 
							 ProjectConstants)
	{
		var _self = this;

		var service = {
			GetAllUsers: GetAllUsers
		};

		return service;

		function GetAllUsers()
		{		
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + "GetAllUsers.php";

			$http.get(url)
			.then(
				d => {
					defered.resolve(d.data);
				}
			)
			.catch(
				error => {
					defered.reject(err);
				}
			);

			return defered.promise;
		};

	};	

})();