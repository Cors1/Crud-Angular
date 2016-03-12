(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.service('crudProject.Service.addUserService', addUserService);

	addUserService.$inject = [
		'$http',  
		'$q', 
		'crudProject.Constants.projectConstants'
	];
	
	function addUserService($http,  
					  		$q, 
							projectConstants)
	{
		var _self = this;

		_self.addNewUser = addNewUser;


		//############ Public Functions ###################
		
		function addNewUser(addUserObj){

				var defered = $q.defer();

				var url = projectConstants.URL_SERVER + "addUser.php";

				var formData = new FormData();
				formData.append('name', addUserObj.name);
				formData.append('surname', addUserObj.surname);
				formData.append('age', addUserObj.age);
				formData.append('email', addUserObj.email);
				formData.append('file', addUserObj.profilePicture);

				$http.post(url, formData, {
					headers: {
						"Content-type": undefined
					},
					transformRequest: formData
				})
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