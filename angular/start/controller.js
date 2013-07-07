var myapp = angular.module('myapp', ['firebase']);

function MyCtrl($scope,
		angularFire) {
    var usersUrl = 'https://salsaapp.firebaseio.com/users';
    angularFire(usersUrl, $scope, 'users',{})
	.then(function() {
	});
    
    $scope.addUser = function(id) {
	if (!id) { 
	    id = $scope.userid.toString()
	}
	console.log("Adding user with id " + id);
    }

    $scope.userLoggedIn = function(userId) {
	$scope.userid = userId;
	angularFire(usersUrl + "/" + userId.toString(), $scope, 'user',{})
	    .then(function() {
		// Add if new user
		if ( ! $scope.user || Object.keys($scope.user).length === 0) {
		    $scope.addUser(userId)
		} 
	    });
    }

    var firebase = new Firebase("https://salsaapp.firebaseio.com/");
    
    // monitor state changes and react to updates
    var authClient = new FirebaseSimpleLogin(firebase, function(error, user) {
	if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	} else if (user) {
		// user authenticated with Firebase
	    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	    $scope.userLoggedIn(user.id)
	    $scope.$apply()
	    
	} else {
	    // user is logged out
	    $scope.userid = null;
	    console.log("Logged out");
	}
    });

    // perform the login (to Facebook in this case)
    $scope.login = function() {
	authClient.login('facebook');
    }

    $scope.logout = function() {
	authClient.logout();
    }
}
