angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete', 'gm.datepickerMultiSelect']).controller('eventseriesController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
    $rootScope.class_status = false;
    if (!$localStorage.isuserloggedIn) {
        $state.go('login');
    }
    var eventService = $injector.get("events");
    if (window.innerWidth > 767) {
        $scope.navCollapsed = false;
    } else {
        $scope.navCollapsed = true;
        $scope.toggleMenu = function() {
            $scope.navCollapsed = $scope.navCollapsed === false ? true : false;
        };
    }






    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    // var afteryesterday = new Date(tomorrow);
    // afteryesterday.setDate(tomorrow.getDate() + 2);
    // var afteryesterday1 = new Date(tomorrow);
    // afteryesterday1.setDate(tomorrow.getDate() + 3);
    

    $scope.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }
        // , {
        //     date: afteryesterday,
        //     status: 'partially'
        // }, {
        //     date: afteryesterday1,
        //     status: 'partially'
        // }


    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    // $scope.thisDate = new Date();

    // this.activeDate = null;
    // this.activeDate2 = null;
    // this.selectedDates = [new Date().setHours(0, 0, 0, 0)];
    // this.selectedDates2 = [new Date().setHours(0, 0, 0, 0)];
    // this.type = 'individual';

    // this.show2pickers = false;

    // this.removeFromSelected = function(dt) {
    //     this.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
    // }

    // this.removeFromSelected2 = function(dt) {
    //     this.selectedDates2.splice(this.selectedDates2.indexOf(dt), 1);
    // }

    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // var afterTomorrow = new Date(tomorrow);
    // afterTomorrow.setDate(tomorrow.getDate() + 1);
    // $scope.events = [{
    //     date: tomorrow,
    //     status: 'full'
    // }, {
    //     date: afterTomorrow,
    //     status: 'partially'
    // }];

    // function getDayClass(data) {
    //     var date = data.date,
    //         mode = data.mode;
    //     if (mode === 'day') {
    //         var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
    //         for (var i = 0; i < $scope.events.length; i++) {
    //             var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
    //             if (dayToCheck === currentDay) {
    //                 return $scope.events[i].status;
    //             }
    //         }
    //     }
    //     return '';
    // }
    // $scope.options1 = {
    //     customClass: getDayClass,
    //     minDate: new Date(),
    //     showWeeks: false
    // };


    //set the map at location
    $scope.locations = [];
    $scope.locations[0] = [];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(32.7990, -86.8073),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var $serviceTestVanue = $injector.get("venues");
    $scope.data = {};

    $scope.error_message = true;
    var event_id = $stateParams.eventId;

    //service created to get event detail

    eventService.getSeriesEvent({ 'event_id': event_id }, function(response) {

        var ages;
        if (response.results[0].custom_ages == null || response.results[0].custom_ages == 0) {
            ages = "All Ages";
        } else if (response.results[0].custom_ages == '18') {
            ages = "18 and  over";
        } else if (response.results[0].custom_ages == '19') {
            ages = "19 and  over";
        } else if (response.results[0].custom_ages == '21') {
            ages = '21 and over';
        } else {
            ages = response.results[0].custom_ages;
        }
        $scope.ages = ages;

        $scope.data1 = response.results[0];
        $scope.title = response.results[0].title;
        $scope.content2 = $sce.trustAsHtml(response.results[0].description);
        $scope.venue_name = response.results[0].venue_name;
        $scope.city = response.results[0].city;
        $scope.state = response.results[0].state;
        $scope.country = response.results[0].country;
        // $scope.start_date = response.timing[0].start_date_time;
        // console.log($scope.start_date);
        // $scope.end_date = response.timing[1].end_date_time;
        // $scope.end_date = response.timing[2].end_date_time;
        // console.log($scope.end_date);
        $scope.start_time = response.results[0].start_time;
        $scope.end_time = response.results[0].end_time;
        $scope.zipcode = response.results[0].zipcode;
        var inc = 0;
        $scope.all_dates = [];
        $scope.all_times = [];

        $scope.events = [];
        console.log("response",response.timing)
        for (dt1 in response.timing) {
            var thisdate = new Date(response.timing[dt1].start_date_time);
            $scope.events[inc] = {date: thisdate,status: 'partially'};
            inc++;
        }
    console.log("eventttttt:",$scope.events);
        //$scope.timings = response.timing[0].start_time + " - " + response.timing[0].end_time;
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();
        var marker, i;

        for (i = 0; i < $scope.locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(response.results[0].latitude, response.results[0].longitude),
                map: map
            });
            bounds.extend(marker.position);
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(response.result[0].address, '');
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }

        //now fit the map to the newly inclusive bounds
        map.fitBounds(bounds);

        var listener = google.maps.event.addListener(map, "idle", function() {
            map.setZoom(14);
            google.maps.event.removeListener(listener);
        });

    });


});
