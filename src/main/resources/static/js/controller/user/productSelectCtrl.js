angular.module('myCart.product_select_module',
		[ 'myCart.shared_module.sharedService' ]).controller(
		'productSelectController', productSelectController);

function productSelectController($scope,$rootScope, sharedService) {
	'use strict';

	var cartUrl = "/cart/";
	var RATING_URL = "/rating/";

	$scope.productItem = sharedService.get('productItem');
	$scope.addToCart = addToCart;
	$scope.addRating = addRating;
	$scope.calculateRating = calculateRating;

	$scope.ratings = [ {
		star : 1,
		max : 5
	} ];

	$scope.rating = {
		firstName : null,
		emailId : null,
		review : null,
		star : null,
	};

	$scope.selectRating = function(star) {
		$scope.rating.star = star;
	}

	function addRating() {
		if (!sharedService.isDefinedOrNotNull($scope.productItem.productID)) {
			return alert('Please select Product again!!');
		}
		sharedService.postMethod(RATING_URL + $scope.productItem.productID,
				$scope.rating).then(function(response) {
			alert('Rating added successfully!!');
		}, function(error) {
			alert(error.data.errorMessage);
		});
	}

	function calculateRating(rating) {
		var newVal = 0;
		angular.forEach(rating, function(oldVal) {
			if (sharedService.isDefinedOrNotNull(oldVal.star)) {
				newVal = newVal + parseInt(oldVal.star);
			}
		});
		if(newVal===0 || rating.lenth==0){
			return 0;
		}	
		else{
			return Math.round(((newVal / rating.length)*100)/100)
		}
	}

	function addToCart(cart) {
		$scope.productItem.userID = parseInt($rootScope.userID);
		sharedService.postMethod(cartUrl, $scope.productItem).then(function(response) {
			$scope.carts = response.data;
			alert(cart.productName + '  added to cart successfully!!');
		}, function(error) {
			$scope.errorMessage = 'Error while creating' + error;
			$scope.successMessage = '';
		});
	}
}
