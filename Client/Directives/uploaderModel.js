(function(){

	'use strict';

	angular
		.module('CRUD.AngularPrj.App')
		.directive('uploaderModel', uploaderModel);

	uploaderModel.$inject = [
		'$parse'
	];	

	function uploaderModel($parse)
	{
		var directive = {
			link: link
		};

		return directive;

		function link(scope, 
					  iElement, 
					  iAttrs)
		{

			iElement.on('change', function (e)
				{
					$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
				}
			);
		}
	};	

})();		