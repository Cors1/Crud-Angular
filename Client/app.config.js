(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.config(CRUDAngularPrjConfig);

	CRUDAngularPrjConfig.$inject = [
		'$stateProvider', 
		'$urlRouterProvider'
	];	

	function CRUDAngularPrjConfig($stateProvider, 
						   		  $urlRouterProvider)
	{
		var templateRelativePath = "Client/Templates/";

		$stateProvider
			.state('app', {
				url: '/',
				views: {
					'headerview': {
						templateUrl: templateRelativePath + 'header/header.html',
						controller: 'CRUD.AngularPrj.HeaderController',
						controllerAs: 'vm'
					},
					'currentview': {
						templateUrl: templateRelativePath + 'create/create.html',
						controller: 'CRUD.AngularPrj.CreateUserController',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.create', {
				url: 'create',
				views: {
					'currentview@': {
						templateUrl: templateRelativePath + 'create/create.html',
						controller: 'CRUD.AngularPrj.CreateUserController',
						controllerAs: 'vm'
					}
				}
			})

			.state('app.update', {
				url: 'update',
				views: {
					'currentview@': {
						templateUrl: templateRelativePath + 'update/update.html',
						controller: 'CRUD.AngularPrj.UpdateController',
						controllerAs: 'vm'
					}
				}
			})

			.state('app.read', {
				url: 'search',
				views: {
					'currentview@': {
						templateUrl: templateRelativePath + 'read/read.html',
						controller: 'CRUD.AngularPrj.ReadUserController',
						controllerAs: 'vm'
					}
				}
			})

			.state('app.read.detail', {
				url: 'search/detail',
				params: {
					userDetail: null
				},
				views: {
					'currentview@': {
						templateUrl: templateRelativePath + 'read/detail.html',
						controller: 'CRUD.AngularPrj.UserDetailController',
						controllerAs: 'vm'
					}
				}
			})

			.state('app.delete', {
				url: 'delete',
				views: {
					'currentview@': {
						templateUrl: templateRelativePath + 'delete/delete.html',
						controller: 'CRUD.AngularPrj.DeleteUserController',
						controllerAs: 'vm'
					}
				}
			})

			.state('app.delete.deleteconfirm', {
				url: 'delete/deleteconfirm',
				views: {
					'currentview@': {
						templateUrl: templateRelativePath + 'delete/deleteConfirm.html',
						controller: 'CRUD.AngularPrj.DetailUserToDeleteController',
						controllerAs: 'vm',
						params: {
							userDetail: null
						}
					}
				}
			})

		$urlRouterProvider.otherwise('/');
	}

})();	