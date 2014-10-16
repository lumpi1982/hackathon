angular.module('signup', [])

.factory('users', function () {
	var users=[];
	return {users: users, storeUser : function (email,password,$http) {
		$http.post('/users', {email: 'asdf@asdf.at'});
		users.push(email);
	}};
})

.controller('SignupController',function($scope,$http, users) {
	$scope.users=users.users; 
	$scope.storeUser = function() {
		users.storeUser($scope.email, $scope.password,$http);
		$scope.email='';
		$scope.password='';
		$scope.loginForm.$setPristine();
	};
})