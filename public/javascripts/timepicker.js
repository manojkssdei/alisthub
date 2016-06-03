$(document).ready(function () {
    $('.timepick').timepicker({
       minuteStep: 15
       });
});
   
$( document ).on( 'click', '.timepick1', function() {

 $('.timepick').timepicker({
      minuteStep: 15
      });
   $('.bootstrap-timepicker-widget').show();
});
function showpicker(){
 $('.bootstrap-timepicker-widget').show();
}