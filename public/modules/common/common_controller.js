/** 
Angular Controller for fetching common data from database
Created : 2016-05-17
Created By: Manoj Kumar
Module : Common Settings 
*/
angular.module('alisthub')
    .controller('commonController', function($scope, $localStorage, $injector, $http, $state, $location, $sce, $rootScope, $timeout) {
        if (!$localStorage.isuserloggedIn) {
            $state.go('login');
        }
        var $serviceTest = $injector.get("common");
        if (window.innerWidth > 767) {
            $scope.navCollapsed = false;
        } else {
            $scope.navCollapsed = true;
            $scope.toggleMenu = function() {
                $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
            };
        }

        /*Default setting for financial information */
        $scope.user = {};
        $scope.countriesOptions = [];

        if ($localStorage.userId != undefined ) {
            $scope.user.seller_id = $localStorage.userId;
        }
        /*Get list of countries and currency codes*/
         $serviceTest.getCountries($scope.user, function(response) {
                if (response.code == 200) {
                    $scope.countries = response.result;
                     for (var key in $scope.countries) {
                        conCode = $scope.countries[key].countryCode;
                        console.log('conCode' , conCode);
                        $scope.countriesOptions.push({label:$scope.countries[key].countryName,value:conCode});
                    }
                }
        });

        


        /* View state field when country is US and disble in all other country cases*/
        $scope.showState = function() {
            if ($scope.user.country != "US") {
                $scope.enableState = false;
            } else {
                $scope.enableState = true;
            }
        }

    })

