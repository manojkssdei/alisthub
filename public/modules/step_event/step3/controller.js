/** 
Anguler Controller to manage look and feel 
Created : 2016-05-26
Created By: Deepak khokkar  
Module : Step 3 Event step  
*/

angular.module('alisthub').controller('step3Controller', function($scope,$localStorage, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,Lookservice) {
    
    $scope.campaign_div=false;
    $scope.module_div=$scope.recipient_div=$scope.preview_div=$scope.image_div=true;
   if ($localStorage.userId!=undefined) {
      //To get venues of a user 
        Lookservice.getlookAndFeel({},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
              $scope.templates=response.result;
            }

            }else{
             $scope.templates=[];   
            }
            
        });
    }
   
    $scope.items = ['item1'];

    $scope.animationsEnabled = true;  
    $scope.look_and_feel_step = [
    { "name": "Template",'id':1},
    {"name": "Design",'id':2},
    {"name": "Recipients",'id':3},
    {"name": "Preview",'id':4}
  ]
    
    $scope.look_and_feel_choose_type = [
    { "name": "Color",'id':5},
    {"name": "Images",'id':6}
   
  ]
    
    $scope.selected=$scope.look_and_feel_step[0];
    $scope.selected1=$scope.look_and_feel_choose_type[0];
     $scope.select1= function(item1) {
    if (item1.id==5) {
      
      $scope.color_div=false;
      $scope.image_div=true;  
    } else if (item1.id==6) {
      $scope.color_div=true;
      $scope.image_div=false;       
    }
    $scope.selected1 = item1; 
  };
   $scope.isActive1 = function(item1) {
    return $scope.selected1 === item1;
  };
     $scope.select= function(item) {
    if (item.id==1) {
      
      $scope.module_div=$scope.recipient_div=$scope.preview_div=true;
      $scope.campaign_div=false;  
    } else if (item.id==2) {
     $scope.module_div=false;
      $scope.campaign_div=$scope.recipient_div=$scope.preview_div=true;       
    }
    else if (item.id==3) {
     $scope.recipient_div=false;
      $scope.campaign_div=$scope.module_div=$scope.preview_div=true;       
    }
    else if (item.id==4) {
     $scope.preview_div=false;
      $scope.campaign_div=$scope.recipient_div=$scope.module_div=true;       
    }
    $scope.selected = item; 
  };


  $scope.isActive = function(item) {
    return $scope.selected === item;
  };
   
    $scope.preview_btn=function($index,size)
    {
       $rootScope.templateId=$index;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'previewtemplate.html',
            controller: 'PreviewTemplateCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });
    }
    
    $scope.edit_footer=function(size){
         var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'editfooter.html',
            controller: 'EditFooterCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });
    }
    
    $scope.select_btn=function(index)
    {
         Lookservice.getTemplate({'templateId':index},function(response){
            if (response!=null) {

            if (response.code == 200)
            {
               $scope.look_and_feel_description=response.result[0].description;
               
               $scope.desc=$sce.trustAsHtml($scope.look_and_feel_description);
               
               $scope.module_div=false;
               $scope.campaign_div=true;
               $scope.selected=$scope.look_and_feel_step[1];
            }

            }else{
               $scope.look_and_feel_description=[];   
            }
            
        });
       
    }
    
    $scope.$watch('backgroundColor', function(newValue, oldValue) {
             console.log(newValue, oldValue);
        });
    $scope.$watch('InnerbackgroundColor', function(newValue, oldValue) {
             console.log(newValue, oldValue);
        });
    $scope.$watch('TextColor', function(newValue, oldValue) {
             console.log(newValue, oldValue);
        });
    $scope.$watch('OuterborderColor', function(newValue, oldValue) {
             console.log(newValue, oldValue);
        });
    $scope.$watch('InnerborderColor', function(newValue, oldValue) {
             console.log(newValue, oldValue);
        });
    
    
});
angular.module('alisthub').controller('PreviewTemplateCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout,Lookservice) {
    var templateId=$rootScope.templateId;
    Lookservice.getpreviewImage({'templateId':templateId},function(response){
       if (response.code==200) {
        $scope.preview_image=response.result[0].preview_image;
       }
    });
     $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

angular.module('alisthub').controller('EditFooterCtrl', function($scope, $uibModalInstance, items,$rootScope,$localStorage,$injector,$timeout,Lookservice) {
    $scope.option_ckeditor1 = {
    language: 'en',
    allowedContent: true,
    entities: false
  };
  $scope.content1="here i am in here..";
  // Called when the editor is completely ready.
  $scope.onReady = function () {
   console.log("ready");
  };
     $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
}); 

angular.module('alisthub').filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){	
    return $sce.trustAsHtml(htmlCode);
  }
}]);