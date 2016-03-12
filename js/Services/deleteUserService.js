(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.service('crudProject.Service.deleteUserService', deleteUserService);

	deleteUserService.$inject = [
		'$http',  
		'$q', 
		'crudProject.Constants.projectConstants'
	];
	
	function deleteUserService($http, 
							   $q, 
							   projectConstants)
	{
		var _self = this;
			
		_self.searchUserToDelete = searchUserToDelete;
		_self.deleteUser = deleteUser;

		function searchUserToDelete(userId){

			var defered = $q.defer();
			var url = projectConstants.URL_SERVER + "getUserByID.php";

			$http.post(url, userId)
			.success(function(data){
				defered.resolve(data);
			})
			.error(function(err){
				defered.reject(err);
			});

			return defered.promise;

		};

		function deleteUser(userId){

			var defered = $q.defer();
			var url = projectConstants.URL_SERVER + "deleteUser.php";

			$http.post(url, userId)
			.success(function(data){
				defered.resolve(data);
			})
			.error(function(err){
				defered.reject(err);
			});

			return defered.promise;

		};

	};	

})();