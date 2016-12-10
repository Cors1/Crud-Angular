(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.service('CRUD.AngularPrj.CommonServicesFactory', CommonServicesFactory);

	CommonServicesFactory.$inject = [
		'$http',  
		'$q', 
		'CRUD.AngularPrj.ProjectConstants'
	];
	
	function CommonServicesFactory($http,  
						 	   $q, 
						 	   ProjectConstants)
	{
		var _self = this;
		
		var service = {
            AddNewUser: AddNewUser,
            GetAllUsers: GetAllUsers,
			GetUserInfoById: GetUserInfoById,
			UpdateUserById: UpdateUserById,
            DeleteUserById: DeleteUserById
		};

		return service;

        //##### Public Methods #####

        function AddNewUser(addUserModel)
		{
			var defered = $q.defer();

			var url = ProjectConstants.URL_SERVER + ProjectConstants.API_FILES_NAMES.ADD_USER;

			var formData = new FormData();
			formData.append('Name', addUserModel.Name);
			formData.append('Surname', addUserModel.Surname);
			formData.append('Age', addUserModel.Age);
			formData.append('Email', addUserModel.Email);
			formData.append('file', addUserModel.ProfilePicture);

			$http
				.post(url, formData, {
					headers: {
						"Content-type": undefined
					},
					transformRequest: angular.identity
				})
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
		}

        function GetAllUsers()
		{		
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + ProjectConstants.API_FILES_NAMES.GET_ALL_USERS;

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
		}

		function GetUserInfoById(userDataObj)
        {	
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + ProjectConstants.API_FILES_NAMES.GET_USER_BY_ID;

			$http.post(url, angular.toJson(userDataObj))
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
		}

		function UpdateUserById(userDataObj)
        {	
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + ProjectConstants.API_FILES_NAMES.UPDATE_USER_BY_ID;

			$http.post(url, angular.toJson(userDataObj))
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
		}

        function DeleteUserById(userId)
		{
			var defered = $q.defer();
			var url = ProjectConstants.URL_SERVER + ProjectConstants.API_FILES_NAMES.DELETE_USER_BY_ID;

			$http.post(url, userId)
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
		}
	}
})();