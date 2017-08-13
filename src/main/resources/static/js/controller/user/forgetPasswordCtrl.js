angular.module('scotchApp.forgetPassword_module',
		[ 'scotchApp.shared_module.sharedService' ]).controller(
		'forgetPasswordController', forgetPasswordController);

function forgetPasswordController($scope, $http, $location, sharedService) {
	'use strict';

	var passwordURL = "user/forgetPassword/";

	$scope.isPasswordMatched = false;
	$scope.isForgetPassword = true;

	$scope.forgetPassword = forgetPassword;
	$scope.checkPassword = checkPassword;
	$scope.passwordReset = passwordReset;

	function checkPassword(confirmPassword) {
		$scope.isPasswordMatched = $scope.user.userPassword == confirmPassword ? false
				: true
	}

	function forgetPassword(userEmail) {
		sharedService.postMethod(passwordURL + userEmail).then(
				function(response) {
					$scope.user = response.data;
					$scope.isForgetPassword = false;
				}, function(error) {
					$scope.errorMessage = 'Error while creating' + error;
					$scope.successMessage = '';
				});
	}

	$scope.userVo = {
		userss : $scope.user,
		userPassword : $scope.confirmPassword
	};

	function passwordReset() {
		$location.path('user');
		sharedService.postMethod(passwordURL, $scope.userVo).then(
				function(response) {
					$location.path('user');
					alert('Password changed successfully!!');
				}, function(error) {
					$scope.errorMessage = 'Error while creating' + error;
					$scope.successMessage = '';
				});
	}
}
