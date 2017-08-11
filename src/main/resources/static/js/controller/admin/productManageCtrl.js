angular.module('scotchApp.productManage_module',
		[ 'scotchApp.shared_module.sharedService' ]).controller(
		'productManageController', productManageController);

function productManageController($scope, $uibModal, sharedService) {
	'use strict';

	var productUrl = "/product";
	var categoryUrl = "/category";

	$scope.products = sharedService.get();
	getProducts();
	getCategory();
	$scope.successMessage = '';
	$scope.errorMessage = '';

	$scope.removeProduct = removeProduct;
	$scope.placeOrder = placeOrderSelectedItem;
	$scope.carts = getCart;

	$scope.openProductModal = openModal;
	$scope.reset = reset;
	$scope.isGridEmpty = isGridEmpty;

	function openModal() {
		var modalInstance = $uibModal.open({
			controller : 'productModalCtrl',
			templateUrl : '/pages/admin/productModal.html',
			transclude : true,
			resolve : {
				categoryList : function() {
					return getCategory();
				}
			}
		});

		if (sharedService.isDefinedOrNotNull(modalInstance)) {
			modalInstance.result.then(function(selected, failure) {
				getProducts();
			});
		}
	}

	$scope.item = {
		productID : null,
		productName : null,
		price : null,
		image : null
	};

	function placeOrderSelectedItem() {
		var productList = [];
		angular.forEach($scope.products, function(selectedJob) {
			if (selectedJob.isChecked) {
				productList.push(selectedJob);
			}
		});

		sharedService.postMethod(productUrl + "saveProducts", productList)
				.then(function(response) {
					getProducts();
				}, function(error) {
					$scope.errorMessage = 'Some thing went wrong';
					$scope.successMessage = '';
				});
	}

	function removeProduct(id) {
		sharedService.deleteMethod(productUrl + "/" + id).then(
				function(response) {
					getProducts();
					$scope.successMessage = 'User created successfully';
					$scope.errorMessage = '';
				},
				function(error) {
					$scope.errorMessage = 'Error while creating User: '
							+ error.data.errorMessage;
					$scope.successMessage = '';
				});
	}

	function getCart() {
		sharedService.getMethod(cartUrl).then(function(response) {
			$scope.cart = response.data;
		}, function(error) {
			$scope.errorMessage = 'Some thing went wrong';
			$scope.successMessage = '';
		});
	}

	function getProducts() {
		sharedService.getAllMethod(productUrl).then(function(response) {
			$scope.products = response.data;
		}, function(error) {
			$scope.errorMessage = 'Some thing went wrong';
			$scope.successMessage = '';
		});
	}

	function getCategory() {
		sharedService.getMethod(categoryUrl).then(function(response) {
			$scope.categories = response.data;
			sharedService.set(response.data);
		}, function(error) {
			$scope.errorMessage = 'Some thing went wrong';
			$scope.successMessage = '';
		});
	}

	function reset() {
		$scope.successMessage = '';
		$scope.errorMessage = '';
	}

	function isGridEmpty(data) {
		return !sharedService.isDefinedOrNotNull(data)
	}
}
