var app = angular.module('analyticsApp', ['angular-google-analytics'])
    .config(function(AnalyticsProvider) {
        // initial configuration
        AnalyticsProvider.setAccount('UA-42282812-1');

        // track all routes (or not)
        AnalyticsProvider.trackPages(true);

        AnalyticsProvider.setDomainName('none');


        // url prefix (default is empty)
        // - for example: when an app doesn't run in the root directory
        AnalyticsProvider.trackPrefix('public/salsaapp');
    })
    .controller('AnalyticsController', function($scope, Analytics) {
        $scope.track = function () {
            // create a new pageview event
            Analytics.trackEvent('schedule', 'star', 'Salsa footwork with Juan');
        }
    }
);