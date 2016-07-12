angular.module('alisthub').controller('widgetcontroller', function($scope, $state, $localStorage, $injector, ngTableParams, $uibModal, $rootScope, $filter, $timeout, $sce, $location) {
    $scope.eventId="22381";
    $scope.ticket_uri="http://tickets.alistixs.com/events/22381";
    $scope.data={};
    $scope.data.title="Upcoming Events";
    $scope.title_text=function()
   {
     $scope.embed_code='<script type="text/javascript">var EventsWidgetDisplayPreferences = {seller_id: '+$scope.eventId+',uri: "'+$scope.ticket_uri+'",domain: "tickets.alistixs.com",title_text: "'+$scope.data.title+'"}</script><script id="EventsWidgetScript" type="text/javascript" src="https://tickets.alistixs.com/js/events_widget.js"></script>';
  } 
 $scope.embed_code='<script type="text/javascript">var EventsWidgetDisplayPreferences = {seller_id: '+$scope.eventId+',uri: "'+$scope.ticket_uri+'",domain: "tickets.alistixs.com",title_text: "'+$scope.data.title+'"}</script><script id="EventsWidgetScript" type="text/javascript" src="https://tickets.alistixs.com/js/events_widget.js"></script>';

});
