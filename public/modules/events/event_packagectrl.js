angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('eventpackageController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
    $rootScope.class_status = false;
    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }
    var package_service = $injector.get("event_package");

    //var $servicepackageVanue = $injector.get("venues");
    $scope.data = {};
    $scope.error_message = true;
    var package_id = $state.params.packageId;
    var user_id=$localStorage.userId;
    console.log(package_id);
    //    package_service.getEventCategoriesList({
    //     'var': 'event_category'
    // }, function(response) {
    //     if (response.code === 200) {
    //         $scope.cat1 = response.result;
    //         // $scope.data.category = ($scope.cat1[0].category_id).toString();
    //         // $scope.data.category = response.result;
    //         // console.log('$scope.data.category' , $scope.data.category);
    //     }
    // });

     if ( $localStorage.packageId) {
        console.log('edit called');

        var packageId = $state.params.packageId;
        package_service.getPackage({ 'package_id': package_id,'user_id': user_id}, function(response) {

              var ages;
        if (response.results[0].ages == null || response.results[0].ages == 0) {
            ages = "All Ages";
        } else if (response.results[0].ages == '18') {
            ages = "18 and  over";
        } else if (response.results[0].ages == '19') {
            ages = "19 and  over";
        } else if (response.results[0].ages == '21') {
            ages = '21 and over';
        } else {
            ages = response.results[0].ages;
        }
        $scope.ages = ages;
    

     $scope.data1 = response.results[0];
        $scope.title = response.results[0].package_name;
        $scope.description = $sce.trustAsHtml(response.results[0].package_description);
           $scope.start_date = response.results[0].online_sales_open_date_time;
          //console.log($scope.start_date);
           $scope.start_time = response.results[0].online_sales_open_time;
           $scope.end_date = response.results[0].online_sales_close_date_time;
           $scope.end_time = response.results[0].online_sales_close_time;

    });
    }
});