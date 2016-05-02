$(document).ready(function () {
    $('.timepick').timepicker({
       minuteStep: 1
       });
});
   
$( document ).on( 'click', '.timepick1', function() {

 $('.timepick').timepicker({
      minuteStep: 1
      });
   $('.bootstrap-timepicker-widget').show();
});
function showpicker(){
 $('.bootstrap-timepicker-widget').show();
}