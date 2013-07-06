var myapp = angular.module('myapp', ['firebase']);

function MyCtrl($scope,
		angularFire) {
    var url = 'https://salsaapp.firebaseio.com/users';
    angularFire(url, $scope, 'items', [])
.then(function() {
    $scope.items.forEach(function(user) {
	console.log("User name is " + user.firstname)
    })
});


/*
    $scope.items.foreEach(function(cus) {
	console.log("Have a customer with firstname " + cus.firstname);
    });
*/
    $scope.customer;
    
    $scope.updateUser = function() {
	var customer = {};
	customer.firstname = $scope.firstname;
	customer.lastname = $scope.lastname;
	$scope.items.push(customer);
    }

    $scope.addUser = function(id) {
	var customer = {};
	customer.id = id;
	$scope.items.push(customer);
    }

//    $scope.remove = function(customer) {
//	var index = $scope.items.indexOf(customer);
//	$scope.items.splice(index,1);
//    }

    var firebase = new Firebase("https://salsaapp.firebaseio.com/");
    
    // monitor state changes and react to updates
    var authClient = new FirebaseSimpleLogin(firebase, function(error, user) {
	if (error) {
	    // an error occurred while attempting login
	    console.log(error);
	} else if (user) {
		// user authenticated with Firebase
	    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	    $scope.info = user;
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
