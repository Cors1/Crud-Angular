(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.factory('CRUD.AngularPrj.AddUserFactory', AddUserFactory);

	AddUserFactory.$inject = [
		'$http',  
		'$q', 
		'CRUD.AngularPrj.ProjectConstants'
	];
	
	function AddUserFactory($http,  
					  		$q, 
							ProjectConstants)
	{
		var _self = this;

		var service = {
			AddNewUser: AddNewUser
		};

		return service;

		//############ Public Functions ###################
		
		function AddNewUser(addUserModel){

				var defered = $q.defer();

				var url = ProjectConstants.URL_SERVER + "AddUser.php";

				var formData = new FormData();
				formData.append('Name', addUserModel.Name);
				formData.append('Surname', addUserModel.Surname);
				formData.append('Age', addUserModel.Age);
				formData.append('Email', addUserModel.Email);
				formData.append('File', addUserModel.ProfilePicture);

				$http
					.post(url, formData, {
						headers: {
							"Content-type": undefined
						},
						transformRequest: formData
					})
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