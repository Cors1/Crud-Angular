(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.service('crudProject.Service.searchUserService', searchUserService);

	searchUserService.$inject = [
		'$http',  
		'$q', 
		'crudProject.Constants.projectConstants'
	];
	
	function searchUserService($http,  
							   $q, 
							   projectConstants)
	{
		var _self = this;

		_self.getAllUsers = getAllUsers;

		function getAllUsers(){
				
			var defered = $q.defer();
			var url = projectConstants.URL_SERVER + "getAllUsers.php";

			$http.get(url)
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