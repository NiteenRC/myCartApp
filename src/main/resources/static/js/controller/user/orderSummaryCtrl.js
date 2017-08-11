angular.module('scotchApp.orderSummary_module',
		[ 'scotchApp.shared_module.sharedService' ]).controller(
		'orderSummaryController', orderSummaryController);

function orderSummaryController($scope, sharedService, $location) {
	'use strict'

	$scope.getDate = getDate();
	$scope.trackOrderNo = trackOrderNo;

	var ORDER_URL = "/order/";

	function getDate() {
		var today = new Date();
		var mm = today.getMonth() + 1;
		var dd = today.getDate();
		var yyyy = today.getFullYear();

		return dd + "/" + mm + "/" + yyyy
	}

	$scope.isOrderTracked = false;

	$scope.orderInfo = {};
	$scope.errorMessage = '';

	$scope.orderInfo = sharedService.get('orderInfo');

	$scope.isProductOrdered = false;

	if (sharedService.isDefinedOrNotNull($scope.orderInfo)) {
		$scope.isProductOrdered = true;
	}

	function trackOrderNo() {
		sharedService.getAllMethod(ORDER_URL + $scope.orderNo).then(
				function(response) {
					$scope.orderTrack = response.data;
					$scope.isOrderTracked = true;
				}, function(error) {
					$scope.errorMessage = error.data.errorMessage;
				});
	}
}
