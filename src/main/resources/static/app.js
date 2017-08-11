angular.module('scotchApp', [ 'ngRoute', 
	    'ngCookies',
		'ui.bootstrap',
		'scotchApp.user_module',
		'scotchApp.home_module',
		'scotchApp.category_module',
		'scotchApp.product_module',
		'scotchApp.product_select_module',
		'scotchApp.cart_module',
		'scotchApp.categoryManage_module', 
		'scotchApp.productManage_module',
		'scotchApp.product_module.productModal',
		'scotchApp.shared_module.sharedService',
		'scotchApp.directive_module.directiveService',
		'scotchApp.directive_module.ratingDirectiveService',
		'scotchApp.orderSummary_module'
]);

