angular.module('scotchApp.user_module',
		[ 'scotchApp.shared_module.sharedService' ]).controller(
		'userController', userController);

function userController($scope, $http, $location, $window, sharedService,
		$rootScope, $interval) {
	'use strict'

	$rootScope.userLoggedin = false;
	$rootScope.userName = '';
	$rootScope.userType = '';
	$rootScope.userDetails = null;
	$scope.isRegistrationRequired = false;

	$scope.registerNewUser = registerNewUser;
	$scope.userLogin = userLogin;

	$interval(function() {
		$scope.currentDateTime = new Date();
	}, 100);

	var checkUserLoginUrl = "user/userLogin/";

	function userLogin(user) {
		$scope.dataLoading = true;
		sharedService.postMethod(checkUserLoginUrl, user).then(
				function(userDetails) {
					$location.path("/category");
					if (userDetails.data.userName != null) {
						$rootScope.userLoggedin = true;
						$scope.isRegistrationRequired = false;
						$rootScope.userName = userDetails.data.userName;
						$rootScope.userLoggedin = true;
						$window.sessionStorage.setItem("userName",
								userDetails.data.userName)
						$window.sessionStorage.setItem("userType",
								userDetails.data.userType)
						$scope.getUserNamerfromCookie();
						$scope.submitted = true;
					}
				}, function(error) {
					$scope.setError(error.data.errorMessage);
					$location.path("/user");
				});
	}

	function registerNewUser(user) {
		if (!$scope.isPasswordMatched) {
			return alert("Entered Password doesn't match");
		}

		$scope.setError('');
		sharedService.postMethod('user/registerNewUser', user).then(
				function(response) {
					$scope.isRegistrationRequired = false;
					$scope.error = false;
				}, function(error) {
					$scope.setError(error.data.errorMessage);
				});
	}

	$scope.isPasswordMatched = false;
	$scope.checkPassword = checkPassword;

	function checkPassword(confirmPassword) {
		$scope.isPasswordMatched = $scope.user.userPassword == confirmPassword ? true
				: false
	}

	$scope.forgetPassword = forgetPassword;
	$scope.isForgetPassword = false;
	$scope.newUserPassword = false;

	function forgetPassword(userEmail) {
		$scope.isForgetPassword = true;
		sharedService
				.getAllMethod('user/forgetPassword/' + userEmail)
				.then(
						function(response) {
							$scope.userPasswordSentMessage = 'Password sent to your email, please check';
							// $scope.newUserPassword = true;
						}, function(error) {
							$scope.setError(error.data.errorMessage);
						});
	}

	$scope.showForgetPassword = showForgetPassword;

	function showForgetPassword() {
		$scope.isForgetPassword = true;
	}

	$scope.setError = function(message) {
		$scope.error = true;
		$scope.errorMessage = message;
	};

	$scope.showRegistration = function() {
		$scope.isRegistrationRequired = true;
	}

	$scope.invalidateUser = function() {
		$window.sessionStorage.setItem("userName", '');
		$window.sessionStorage.setItem("userType", '');
		$rootScope.userLoggedin = false;
		$location.path("/user");
	}

	$scope.getUserNamerfromCookie = function() {
		$rootScope.userName = $window.sessionStorage.getItem("userName");
		$rootScope.userType = $window.sessionStorage.getItem("userType");
	}

	$scope.getUserNamerfromCookie();
}