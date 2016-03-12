(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.factory('crudProject.Factory.sharedDataFactory', sharedDataFactory);

	sharedDataFactory.$inject = [
		
	];	

	function sharedDataFactory(){

		var detailPerson = null;

		var service = {
			detailPerson: detailPerson
		};

		return service

	};

})();