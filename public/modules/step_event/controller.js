angular.module("google.places",[]);
angular.module('alisthub', ['google.places', 'angucomplete']).controller('stepeventController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location) { 
   //For Step 1
    var $serviceTest = $injector.get("venues");
    $scope.select_delect_event=true;
    $scope.days_div=$scope.error_message=true;
    $scope.select_checkbox=function($event){
        var dateArray = new Array();
       angular.forEach($scope.days, function(day){
        if (!!day.selected) 
        {
          dDate1=new Date($scope.multiple_start_date);
          dDate2=new Date($scope.multiple_end_date);
         
           while (dDate1<=dDate2)
          {
            var currentDate=JSON.parse(JSON.stringify(dDate1));
            if (dDate1.getDay()==day.id) {
           
              dateArray.push(currentDate);
              
           }
            dDate1.setDate(dDate1.getDate() + 1);
          }
          
        }
      })
    
       $scope.between_date=dateArray; 
     
    }
    $scope.error_message=true;
    $scope.savedata=function(data)
    {
        if (data.eventtype=='single') {
          if (($scope.selectevent_date!=undefined) &&($scope.startevent_time!=undefined)&&($scope.endevent_time!=undefined)) {
            data.eventdate=$scope.single_start_date;
            
            data.startevent_time=$scope.startevent_time;
            data.endevent_time=$scope.endevent_time;
            
            data.userId=$localStorage.userId;
            $serviceTest.saveEvent(data,function(response){
              if (response.code == 200) {
                   $scope.success="Event Successfully Saved.";
                   $scope.data={};
                   $scope.selectevent_date=$scope.starttime=$scope.endtime=$scope.startevent_time=$scope.endevent_time='';
                         $scope.error_message=false;
                         $timeout(function() {
                          
                           $scope.success='';
                           $scope.error_message=true;
                         },3000);
                        console.log($location.path());
                         $location.path();
              }
              });
            
        }  
        }else{

         
          data.userId=$localStorage.userId;
         
          $serviceTest.saverecurringEvent({'data':data,'date':$scope.between_date},function(response){
           
              if (response.code == 200) {
                   $scope.success="Event Successfully Saved.";
                   $scope.data={};
                        $scope.error_message=false;

                         $timeout(function() {
                          
                           $scope.success='';
                           $scope.error_message=true;
                         },3000);
                         console.log($location.path());
                         $location.path();
              }
              }); 
        }
        
        
    
    }
    $scope.removediv=function(index){
        $scope.between_date.splice(index,1);
    }
     $scope.recurring_period=function(action){
       //console.log($scope.data.period);
       
       if(($scope.multiple_start_date===undefined)||($scope.multiple_end_date==undefined))
       {
        if ((action=='start')||(action=='end')) {}else{
        $scope.error="Please select start date and end date.";
        $scope.error_message=false;
        $timeout(function() {
             
          $scope.error='';
          $scope.error_message=true;
          $scope.data.period='';
        },3000);
        }
       }else{
        if (($scope.data.period=='hourly')||($scope.data.period=='monthly')) {
            $scope.days_div=false;
            $scope.between_date=[];
        }else{
           console.log($scope.data.period); 
        if ($scope.data.period!=undefined) {
                $scope.days_div=true;
                currentDate=new Date($scope.multiple_start_date);
                endDate=new Date($scope.multiple_end_date);
                
                var between=[];
                while (currentDate <= endDate) {
                    between.push(new Date(currentDate));
                    currentDate.setDate(currentDate.getDate() + 1);
                    
                }
                $scope.between_date=between;  
            }
        }
       }
    }
    $scope.days=[
      {id: '0', name: 'Sun'},
      {id: '1', name: 'Mon'},
      {id: '2', name: 'Tues'},
      {id: '3', name: 'Wed'},
      {id: '4', name: 'Thurs'},
      {id: '5', name: 'Fri'},
      {id: '6', name: 'Sat'}
    ]
    $scope.timeperiod=[
      {id: 'daily', name: 'Daily'},
      {id: 'hourly', name: 'Hourly'},
      {id:'weekly',name:'Weekly'},
      {id:'monthly',name:'Monthly'}
    ]
     $rootScope.starttime='';
     $rootScope.endtime='';
     $scope.data = {};
     $scope.locations = [];
     $scope.locations[0]=[];
      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
       center: new google.maps.LatLng(32.7990, -86.8073),
      mapTypeId: google.maps.MapTypeId.ROADMAP 
    });
     $scope.$on('g-places-autocomplete:select', function (event, place) {
        
        if (place.geometry) {
        $scope.data.latitude  = place.geometry.location.lat();
        $scope.data.longitude = place.geometry.location.lng();
    }
     
    $scope.data.address = place.formatted_address;
    
    $scope.data.zipcode = '';
    $scope.data.country = '';
    $scope.data.state = '';
    $scope.data.city = '';
    
    // FINDING ZIP
    if (place.address_components[place.address_components.length-1].types[0] == 'postal_code') {
      $scope.data.zipcode = Number(place.address_components[place.address_components.length-1].long_name);
    };
     // FINDING COUNTRY 
    if (place.address_components[place.address_components.length-1].types[0] == 'country' || 
        place.address_components[place.address_components.length-2].types[0] == 'country') {
      if(place.address_components[place.address_components.length-1].types[0] == 'country'){
        $scope.data.country = place.address_components[place.address_components.length-1].long_name;  
      }else{
        $scope.data.country = place.address_components[place.address_components.length-2].long_name;  
      }      
    };
    // FINDING STATE
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_1') {
      
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-1].long_name;
      }else if(place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-2].long_name;  
      }else{
        $scope.data.state = place.address_components[place.address_components.length-3].long_name;  
      }
    };
    // FINDING CITY
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_2' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_2' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_2' ||
        place.address_components[place.address_components.length-4].types[0] == 'administrative_area_level_2' ||

        place.address_components[place.address_components.length-1].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-2].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'sublocality_level_1' ||
        place.address_components[place.address_components.length-4].types[0] == 'sublocality_level_1' ) {
    
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_2' || 
        place.address_components[place.address_components.length-1].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-1].long_name;
      }else if( place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_2' || 
                place.address_components[place.address_components.length-2].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-2].long_name;  
      }else if( place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_2' || 
                place.address_components[place.address_components.length-3].types[0] == 'sublocality_level_1'){
        $scope.data.city = place.address_components[place.address_components.length-3].long_name;  
      }else{
        $scope.data.city = place.address_components[place.address_components.length-4].long_name;  
      }    
    };
    
     // FINDING STATE
    if (place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1' || 
        place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1' ||
        place.address_components[place.address_components.length-3].types[0] == 'administrative_area_level_1') {
      
      if(place.address_components[place.address_components.length-1].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-1].long_name;
      }else if(place.address_components[place.address_components.length-2].types[0] == 'administrative_area_level_1'){
        $scope.data.state = place.address_components[place.address_components.length-2].long_name;  
      }else{
        $scope.data.state = place.address_components[place.address_components.length-3].long_name;  
      }
    };
    $scope.locations[0].push($scope.data.state,
        $scope.data.latitude,
        $scope.data.longitude,
        1,
        $scope.data.city,
        "",
        $scope.data.address,
        "coming soon");
    var bounds = new google.maps.LatLngBounds();
     var infowindow = new google.maps.InfoWindow();

    var marker, i;
    
    for (i = 0; i < $scope.locations.length; i++) {
       
      marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.data.latitude, $scope.data.longitude),
        map: map
      });
     bounds.extend(marker.position);
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          
          infowindow.setContent($scope.data.address, '');
          infowindow.open(map, marker);
        } 
      })(marker, i));
    }
    //now fit the map to the newly inclusive bounds
    map.fitBounds(bounds);

    //(optional) restore the zoom level after the map is done scaling
    var listener = google.maps.event.addListener(map, "idle", function () {
        map.setZoom(14);
        google.maps.event.removeListener(listener);
    });
      });
     $scope.venue_info=function(venuedata){
    
        $scope.data.venuename=venuedata.venue_name;
        $scope.data.place=venuedata.address;
        $scope.data.venueid=venuedata.id;
        $scope.data.city=venuedata.city;
        $scope.data.country=venuedata.country;
        $scope.data.latitude=venuedata.latitude;
        $scope.data.longitude=venuedata.longitude;
        $scope.data.longitude=venuedata.longitude;
        $scope.data.state=venuedata.state;
        $scope.data.zipcode=venuedata.zipcode;
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();

       var marker, i;
         marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.data.latitude, $scope.data.longitude),
        map: map
      });
     bounds.extend(marker.position);
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          
          infowindow.setContent($scope.data.place, '');
          infowindow.open(map, marker);
        } 
      })(marker, i));
      map.fitBounds(bounds);
    }
     
    if ($localStorage.userId!=undefined) {
       
        $serviceTest.getVenues({'userId':$localStorage.userId},function(response){
            if (response!=null) {
            if (response.code==200)
             {
              $scope.total_venue=response.result;
             }
            }else{
             $scope.total_venue=[];   
            }
            
        });
    }
 
 
   

   
   var now = new Date();
if (now.getMonth() == 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
$scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return '';
    //mode === 'day' && (date.getDay() === 0 || date.getDay() === 6)
  }



  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
 $scope.popup1 = {
    opened: false
  };
   $scope.popup2 = {
    opened: false
  };
$scope.option_ckeditor = {
    language: 'en',
    allowedContent: true,
    entities: false
  };

  // Called when the editor is completely ready.
  $scope.onReady = function () {
    // ...
  };
 $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };
  
  $scope.options1 = {
    customClass: getDayClass,
    initDate: current,
    showWeeks: true
  };

var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
  
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 1;



  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };
  
  
    $scope.multiple_event_div=$scope.location_event_div=$scope.price_and_link_div=$scope.look_and_feel_div=$scope.setting_div=true;
     $scope.events = [
    { "name": "Single Event",'id':1},
    {"name": "Multiple Event",'id':2}
    
]
     $scope.venues = [
    { "name": "Add New Venue",'id':3},
    {"name": "Use Past Location",'id':4}
    
]
     $scope.steps=[
     { "title":"Events Details","icon":'fa fa-calendar','id':5},
     { "title":"Price & Links","icon":'fa fa-tags','id':6},
     { "title":"Look & Feel","icon":'fa fa-eye','id':7},
     { "title":"Setting","icon":'fa fa-cog','id':8}
    ];
     
     $scope.selected=$scope.events[0];
     $scope.selected1=$scope.venues[0];
     $scope.selected2=$scope.steps[0];
     
     $scope.click_menu=function(menu)
     {
       
       if (menu.id==5) {
        
        $scope.eventdetail_div=false;
        $scope.price_and_link_div=$scope.look_and_feel_div=$scope.setting_div=true;
       }
       if (menu.id==6) {
         $scope.eventdetail_div=$scope.look_and_feel_div=$scope.setting_div=true;
        $scope.price_and_link_div=false;
       }
       if (menu.id==7) {
        $scope.eventdetail_div=$scope.price_and_link_div=$scope.setting_div=true;
        $scope.look_and_feel_div=false;
       }
       if (menu.id==8) {
        $scope.eventdetail_div=$scope.look_and_feel_div=$scope.price_and_link_div=true;
        $scope.setting_div=false;
       }
        $scope.selected2 = menu;  
     }
     
     $scope.select_venue=function(venue){
       if(venue.id==3)
       {
        $scope.venue_event_div=false;
        $scope.location_event_div=true;
       }else{
        $scope.venue_event_div=true;
        $scope.location_event_div=false;
       }
       $scope.selected1 = venue; 
     }
     $scope.select= function(item) {
        if (item.id==1) {
            $scope.data.eventtype='single';
          $scope.multiple_event_div=true;
          $scope.single_event_div=false;  
        }else{
         $scope.data.eventtype='multiple';
         $scope.multiple_event_div=false;
         $scope.single_event_div=true;      
        }
        $scope.selected = item; 
 };

 $scope.isActive = function(item) {
        
        return $scope.selected === item;
 };
  $scope.isActive1 = function(venue) {
        
        return $scope.selected1 === venue;
 };
 
 $scope.isActive2 = function(step2) {
        
        return $scope.selected2 === step2;
 };
 
//For Step 2
$scope.items = ['item1'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

  };
  var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
   var weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

  
   $scope.single_eventstart=function()
   {
    if($rootScope.selectevent_date==undefined)
    {
        $scope.select_delect_event=false;
        var d=new Date($scope.start_date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var day=d.getDay();
        var curr_year = d.getFullYear();
        var cur_mon=d.getMonth()+1;
        $rootScope.single_start_date=curr_year+"-"+cur_mon+"-"+curr_date;
        $rootScope.selectevent_date=weekday[day]+" "+m_names[curr_month]+" "+curr_date + "," + curr_year;  
    }else{
      var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: '',
      resolve: {
        items: function () {
            
            
          return $scope.items;
        }
      }
    });
    }
   }
   
  /* $scope.single_eventend=function()
   {
    if($rootScope.selectevent_date==undefined)
    {
        var d=new Date($scope.end_date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var day=d.getDay();
        var curr_year = d.getFullYear();
        var cur_mon=d.getMonth()+1;
         $rootScope.single_start_date=curr_year+"-"+cur_mon+"-"+curr_date;
        $rootScope.selectevent_date=weekday[day]+" "+m_names[curr_month]+" "+curr_date + "," + curr_year; 
    }else{
     var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: '',
      resolve: {
        items: function () {
          
          return $scope.items;
        }
      }
    });
    }
    
   }*/
   
   $scope.remove_event=function()
   {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: '',
      resolve: {
        items: function () {
          
          return $scope.items;
        }
      }
    });
   }
   
   $scope.changedstarttime=function(){
    $scope.select_delect_event=false;
    $rootScope.startevent_time=$filter('date')($scope.starttime, 'shortTime');
    
   } 
   
   $scope.changedendtime=function(){
    $scope.select_delect_event=false;
    $rootScope.endevent_time=$filter('date')($scope.endtime, 'shortTime');
   }
   
  $scope.data = {};
   $scope.multiplestart=function(){
    
    $scope.data.starttimeloop1=[];
    
    var i=0;
    while(i<$scope.between_date.length)
    {
        
        $scope.data.starttimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_starttime)));
    
      i++;  
    }
    
   }
   $scope.multipleend=function(){
    
  $scope.data.endtimeloop1=[];
    var j=0;
    console.log($scope.between_date.length);
    console.log($scope.multiple_endtime);
    while(j<$scope.between_date.length)
    {
    $scope.data.endtimeloop1.push(JSON.parse(JSON.stringify($scope.multiple_endtime)));
      j++;  
    }
   
    console.log($scope.data.endtimeloop1);
   }

});
angular.module('alisthub').controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items,$rootScope) {
     $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };


  $scope.remove=function(){
  
    delete $rootScope.selectevent_date;
    delete $rootScope.startevent_time;
    delete $rootScope.endevent_time;
   
    $uibModalInstance.close($scope.selected.item);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
