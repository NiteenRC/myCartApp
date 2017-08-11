angular.module('scotchApp').config(function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'pages/user/home.html',
		controller : 'homeController'
	}).when('/user', {
		templateUrl : 'pages/user/user.html',
		controller : 'userController'
	}).when('/category', {
		templateUrl : 'pages/user/category.html',
		controller : 'categoryController'
	}).when('/productList', {
		templateUrl : 'pages/user/productList.html',
		controller : 'productController'
	}).when('/productSelected', {
		templateUrl : 'pages/user/productSelected.html',
		controller : 'productSelectController'
	}).when('/cart', {
		templateUrl : 'pages/user/cart.html',
		controller : 'cartController'
	}).when('/orderSummary', {
		templateUrl : 'pages/user/orderSummary.html',
		controller : 'orderSummaryController'
	}).when('/trackOrder', {
		templateUrl : 'pages/user/trackOrder.html',
		controller : 'orderSummaryController'
	}).when('/checkout', {
		templateUrl : 'pages/user/checkout.html',
		controller : 'cartController'
	}).when('/productManage', {
		templateUrl : 'pages/admin/manage_product.html',
		controller : 'productManageController'
	}).when('/categoryManage', {
		templateUrl : 'pages/admin/manage_category.html',
		controller : 'categoryManageController'
	}).otherwise({
		redirectTo : '/home'
	});
});