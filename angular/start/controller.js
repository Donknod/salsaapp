var myapp = angular.module('myapp', ['firebase']);

function MyCtrl($scope,
		angularFire) {
    var usersUrl = 'https://salsaapp.firebaseio.com/users';
    angularFire(usersUrl, $scope, 'users', [])
.then(function() {
    $scope.users.forEach(function(user) {
	console.log("name name is " + JSON.stringify(user))
	console.log("This is Sjur " + $scope.users['0'].firstname);
    })
});
    var peopleUrl = 'https://salsaapp.firebaseio.com/people';

/*
    $scope.items.foreEach(function(cus) {
	console.log("Have a customer with firstname " + cus.firstname);
    });
*/
      
    $scope.updateUser = function() {
	var customer = {};
	customer.firstname = $scope.firstname;
	customer.lastname = $scope.lastname;
	//$scope.users.push(customer);
    }

    $scope.addUser = function(id) {
	var customer = {};
	$scope.users
	// TODO(lea): Add people
    }

//    $scope.remove = function(customer) {
//	var index = $scope.items.indexOf(customer);
//	$scope.items.splice(index,1);
//    }

    $scope.userLoggedIn = function(userId) {
	$scope.userid = userId;
	/*
	if ( ! $scope.users[userId]) {
	    $scope.addUser(userId);
	}
*/
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
	    delete $scope.info 
	    console.log("Logged out");
	}
    });

    // perform the login (to Facebook in this case)
    $scope.onLoginButtonClicked = function() {
	authClient.login('facebook');
    }

    $scope.logout = function() {
	authClient.logout();
    }
}
