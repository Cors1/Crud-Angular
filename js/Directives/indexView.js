(function(){

	'use strict';

	angular
		.module('crudProject.App')
		.directive('indexView', indexView);	

	function indexView(){

		var directive = {
			restrict: 'E',
			templateUrl: 'js/Directives/Templates/indexView.html',
			controller: indexViewController,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

	};	
	
	indexViewController.$inject = [
		'crudProject.Service.searchUserService'
	];

	function indexViewController(searchUserService){

		//############ Instance Properties ###################
		
		var vm = this;

		searchUserService.getAllUsers().then(function(data){
			
			vm.count = data == 1 ? 0 : data.length; 

		});
	};

})();		