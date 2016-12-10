(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.constant('CRUD.AngularPrj.ProjectConstants', {
			URL_SERVER: 'http://localhost:81/Crud-Angular/Server/api/',
			API_FILES_NAMES: {
				ADD_USER: 'AddUser.php',
				DELETE_USER_BY_ID: 'DeleteUserByID.php',
				GET_ALL_USERS: 'GetAllUsers.php',
				GET_USER_BY_ID: 'GetUserByID.php',
				UPDATE_USER_BY_ID: 'UpdateUserByID.php',
			}
		});

})();