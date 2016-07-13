angular.module('alisthub').controller('widgetcontroller', function($scope, $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter, $timeout, $sce, $location) {
    $scope.eventId = "22381";
    $scope.ticket_uri = "http://tickets.alistixs.com/events/22381";
    $scope.data = {};
    $scope.data.title = "Upcoming Events";
    $scope.data.max_number_of_events = 4;
    $scope.data.group_series_events = true;
    $scope.data.display_title_bar = true;
    $scope.data.display_date_block = true;
    $scope.data.display_full_date = true;
    $scope.data.display_time = true;
    $scope.data.width = "330px";
    $scope.data.height = "auto";
    $scope.data.background_color = "#2c344b";
    $scope.data.header_color = "#FFFFFF";
    $scope.data.row_background_color = "#FFFFFF";
    $scope.data.text_color = "#333";
    $scope.data.link_color = "#fe1e5a";
    console.log($scope.data);
    $scope.title_text = function() {
        $scope.embed_code = '<script type="text/javascript">var EventsWidgetDisplayPreferences = {seller_id: ' + $scope.eventId + ',uri: "' + $scope.ticket_uri + '",domain: "tickets.alistixs.com",  white_label: "ALIST Solutions LLC",title_text: "' + $scope.data.title + '",height: "' + $scope.data.height + '",width: "' + $scope.data.width + '",background_color: "' + $scope.data.background_color + '",header_color: "' + $scope.data.header_color + '",row_background_color:"' + $scope.data.row_background_color + '",text_color: "' + $scope.data.text_color + '",link_color:"' + $scope.data.text_color + '",max_number_of_events:"' + $scope.data.max_number_of_events + '",group_series_events:"' + $scope.data.group_series_events + '",display_title_bar:"' + $scope.data.display_title_bar + '",include_scrollbar: "auto", display_date_block: "' + $scope.data.display_date_block + '",display_image: "none",display_full_date: "' + $scope.data.display_full_date + '",display_time: "' + $scope.data.display_time + '",display_venue: "true", display_tickets_link: "none"}</script><script id="EventsWidgetScript" type="text/javascript" src="https://tickets.alistixs.com/js/events_widget.js"></script>';
    }


});
