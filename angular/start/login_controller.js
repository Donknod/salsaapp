var myapp = angular.module('myapp', ['firebase', "FacebookModule"])
        .value('fbUrl', 'https://salsaapp.firebaseio.com/')
    ;

function LoginCtrl($scope, fbUrl, angularFireAuth, Facebook) {

    var FB = Facebook();

    var options = {
        scope : $scope,
        name : "user"
    }

    angularFireAuth.initialize(fbUrl, options);

    $scope.login = function() {
        console.log("Logging in");
        angularFireAuth.login('facebook');
    }

    $scope.logout = function() {
        console.log("Logging out");
        angularFireAuth.logout();
    }

    $scope.$on("angularFireAuth:login", function(event, user) {
        console.log("User loggged in " + $scope.user.id);
        for (var id in user) {
            console.log(id + ": " + user[id]);
        }
        FB.api('/me/friends?access_token=' + $scope.user.accessToken, function(response) {
            console.log(JSON.stringify(response));
            $scope.friends = response.data;
            $scope.$apply();
        });
    });

    $scope.$on("angularFireAuth:logout", function() {
        console.log("Logged out");
    });

    $scope.$on("angularFireAuth:error", function(err) {
        console.log("Login error " + err);
    });
}
