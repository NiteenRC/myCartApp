angular.module('scotchApp.orderManage_module',
		[ 'scotchApp.shared_module.sharedService' ]).controller(
		'orderManageController', orderManageController);

function orderManageController($scope, sharedService) {
	'use strict';

	var orderUrl = "/order/";

	$scope.updateOrderStatus = updateOrderStatus;
	getOrders();
	$scope.isGridEmpty = isGridEmpty;

	function updateOrderStatus(order) {
		sharedService.postMethod(orderUrl, order).then(function(response) {
			getOrders();
		}, function(error) {
			alert(error.data.errorMessage);
		});
	}

	function getOrders() {
		sharedService.getAllMethod(orderUrl).then(function(response) {
			$scope.orders = response.data;
		}, function(error) {
			$scope.errorMessage = error.data.errorMessage;
		});
	}

	function isGridEmpty(data) {
		return !sharedService.isDefinedOrNotNull(data)
	}
}
