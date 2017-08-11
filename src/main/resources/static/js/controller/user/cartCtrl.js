angular.module('scotchApp.cart_module',
		[ 'scotchApp.shared_module.sharedService' ]).controller(
		'cartController', cartController);

function cartController($scope, $uibModal, sharedService, $location) {
	'use strict';

	var cartUrl = "/cart/";
	var ORDER_LIST_SAVE = "/order/saveOrders";
	String
	var CART_LIST_SAVE = "/cart/saveCarts";

	getCarts();
	$scope.removeCart = removeCart;
	$scope.addToCart = addToCart
	$scope.addCartList = addCartList;

	$scope.successMessage = '';
	$scope.errorMessage = '';

	$scope.reset = reset;
	$scope.isGridEmpty = isGridEmpty;

	$scope.cartData = {
		productName : null,
		price : null,
		image : null,
		qty : null
	};

	$scope.order = {};

	$scope.purchaseOrderDetail = [ {
		"quanity" : 2,
		"productName" : "opp a37",
		"price" : 110000,
		"amount" : 1
	}, {
		"quanity" : 4,
		"productName" : "SSSS",
		"price" : 120000,
		"amount" : 11
	} ];

	$scope.orderVo = {
		purchaseOrder : $scope.order,
		purchaseOrderDetail : $scope.purchaseOrderDetail
	}

	$scope.addToCart = addToCart;
	$scope.placeOrder = placeOrder;

	function placeOrder() {
		sharedService.postMethod(ORDER_LIST_SAVE, $scope.orderVo).then(
				function(response) {
					// $scope.orderInfo = response.data;
					sharedService.store('orderInfo', response.data);
					$location.path("/orderSummary");
				}, function(error) {
					$scope.errorMessage = 'Error while creating' + error;
					$scope.successMessage = '';
				});
	}

	function addToCart(cart) {
		sharedService.postMethod(cartUrl, cart).then(function(response) {
			$scope.carts = response.data;
			alert(cart.productName + '  added to cart successfully!!');
		}, function(error) {
			$scope.errorMessage = 'Error while creating' + error;
			$scope.successMessage = '';
		});
	}

	function addCartList() {
		sharedService.postMethod(CART_LIST_SAVE, $scope.carts).then(
				function(response) {
					$location.path("/checkout");
					$scope.carts = response.data;
				}, function(error) {
					$scope.errorMessage = 'Error while creating' + error;
					$scope.successMessage = '';
				});
	}

	function getCarts() {
		sharedService.getMethod(cartUrl).then(function(response) {
			$scope.carts = response.data;
		}, function(error) {
			$scope.errorMessage = 'Error while creating' + error;
			$scope.successMessage = '';
		});
	}

	function removeCart(id) {
		sharedService.deleteMethod(cartUrl + id).then(function(response) {
			getCarts();
			$scope.successMessage = 'User created successfully';
			$scope.errorMessage = '';
		}, function(error) {
			$scope.errorMessage = 'Some thing went wrong' + error;
			$scope.successMessage = '';
		});
	}

	$scope.getTotal = function(val) {
		var total = 0;
		angular.forEach($scope.carts, function(oldVal) {
			total += oldVal[val];
		});
		return total;
	};

	function reset() {
		$scope.successMessage = '';
		$scope.errorMessage = '';
	}

	function isGridEmpty(data) {
		return !sharedService.isDefinedOrNotNull(data)
	}
}
