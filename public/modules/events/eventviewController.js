angular.module("google.places", []);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('eventviewController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad, $state, ngTableParams, $stateParams, $sce) {
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

    eventService.getEvent({ 'event_id': event_id }, function(response) {
     
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
        $scope.start_date = response.results[0].start_date;
        $scope.start_time = response.results[0].start_time;
        $scope.end_time = response.results[0].end_time;
        $scope.zipcode = response.results[0].zipcode;
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




    // //get comment  
    // $scope.array = [];


    // eventService.getComment({ 'seller_id': $localStorage.userId}, function(response) {

    //     if (response != null) {

    //        if (response.code == 200) {
    //             for (j in response.result) {
    //                 var comment_detail = response.result[j];
                    
    //                 $scope.array.push([comment_detail.comment, comment_detail.created,comment_detail.first_name,comment_detail.last_name]);

    //             }

    //             $scope.comments = $scope.array;
              
    //         } else {
    //             $scope.activation_message = global_message.ErrorInActivation;
    //         }
    //     }
    // });

    //add the comments 

    // $scope.data = {};
    // eventService.addComment($scope.data, function(response) {
    //             if (response.code == 200) {
    //                 // $scope.success = "comment Successfully Saved.";

    //                 //  

    //                 $scope.array = [];


    //                 eventService.getComment({ 'seller_id': $localStorage.userId }, function(response) {

    //                     if (response != null) {

    //                         if (response.code == 200) {
    //                             for (j in response.result) {
    //                                 var comment_detail = response.result[j];

    //                                 $scope.array.push([comment_detail.comment, comment_detail.created, comment_detail.first_name, comment_detail.last_name]);

    //                             }

    //                             $scope.comments = $scope.array;
                           
    //                         }
    //                          else {
    //                             $scope.activation_message = global_message.ErrorInActivation;
    //                         }
    //                     }
    //                 });
    //                 // var node = document.createElement("LI");
    //                 // var textnode = document.createTextNode($scope.data.comment);

    //                 // node.appendChild(textnode);
    //                 // document.getElementById("myList").appendChild(node);
    //                 // $scope.data.comment = "";
    //                      $scope.data.comment = "";


    //             } else {
    //                 $scope.activation_message = global_message.ErrorInActivation;
    //             }

    //         });





});
