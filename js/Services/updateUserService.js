(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.service('crudProject.Service.updateUserService', updateUserService);

	updateUserService.$inject = [
		'$http',  
		'$q', 
		'crudProject.Constants.projectConstants'
	];
	
	function updateUserService($http,  
						 $q, 
						 projectConstants)
	{
		var _self = this;
		
		_self.getUserData = getUserData;
		_self.updateUser = updateUser;

		function getUserData(userDataObj){
				
				var defered = $q.defer();
				var url = projectConstants.URL_SERVER + "getUserByID.php";

				$http.post(url, userDataObj)
				.success(function(data){
					defered.resolve(data);
				})
				.error(function(err){
					defered.reject(err);
				});

				return defered.promise;
			};

		function updateUser(userDataObj){
			
			var defered = $q.defer();
			var url = projectConstants.URL_SERVER + "updateUser.php";

			$http.post(url, userDataObj)
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