(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.service('CRUD.AngularPrj.UpdateUserFactory', UpdateUserFactory);

	UpdateUserFactory.$inject = [
		'$http',  
		'$q', 
		'CRUD.AngularPrj.ProjectConstants'
	];
	
	function UpdateUserFactory($http,  
						 	   $q, 
						 	   ProjectConstants)
	{
		var _self = this;
		
		var service = {
			GetUserInfoById: GetUserInfoById,
			UpdateUserById: UpdateUserById
		};

		function GetUserInfoById(userDataObj){
				
				var defered = $q.defer();
				var url = ProjectConstants.URL_SERVER + "getUserByID.php";

				$http.post(url, angular.toJson(userDataObj))
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
			};

		function UpdateUserById(userDataObj){
			
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + "updateUser.php";

			$http.post(url, angular.toJson(userDataObj))
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
		};

	};	

})();