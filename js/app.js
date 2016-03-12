(function(){

	'use strict';

	angular
		.module('crudProject.App', [
			'ui.router',
			'ui.bootstrap',   
			'ngAnimate',
			'toaster'
		])
		.config(projectConfig);

	projectConfig.$inject = [
		'$stateProvider', 
		'$urlRouterProvider'
	];	

	function projectConfig($stateProvider, 
						   $urlRouterProvider)
	{
		$stateProvider

			.state('index', {
				url: '/index',
				templateUrl: 'views/index.html',
				controller: 'crudProject.Controller.addPersonController',
				controllerAs: 'vm'
			})

			.state('update', {
				url: '/update',
				templateUrl: 'views/update.html',
				controller: 'crudProject.Controller.updatePersonController',
				controllerAs: 'vm'
			})

			.state('search', {
				url: '/search',
				templateUrl: 'views/search.html',
				controller: 'crudProject.Controller.searchPersonController',
				controllerAs: 'vm',
				resolve: {
					getListUsers: getListUsers
				}
			})

			.state('delete', {
				url: '/delete',
				templateUrl: 'views/delete.html',
				controller: 'crudProject.Controller.PersonDeleteController',
				controllerAs: 'vm'
			})

			.state('deleteConfirm', {
				url: '/delete/deleteConfirm',
				templateUrl: 'views/deleteConfirm.html',
				controller: 'crudProject.Controller.PersonToDeleteController',
				controllerAs: 'vm'
			})

			.state('details', {
				url: '/search/details',
				templateUrl: 'views/detail.html',
				controller: 'crudProject.Controller.PersonDetailController',
				controllerAs: 'vm'
			})

		$urlRouterProvider.otherwise('/index');
	};	

	getListUsers.$inject = [
		'crudProject.Service.searchUserService'
	];

	function getListUsers(searchUserService){

		return searchUserService.getAllUsers();
	};

})();	