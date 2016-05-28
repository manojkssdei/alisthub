/** 
Anguler Controller to manage look and feel 
Created : 2016-05-26
Created By: Deepak khokkar  
Module : Step 3 Event step  
*/

angular.module('alisthub').controller('step3Controller', function($scope,$localStorage, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,Lookservice) {
    
    $scope.campaign_div=false;
    $scope.module_div=true;
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
            }

            }else{
               $scope.look_and_feel_description=[];   
            }
            
        });
       
    }
    
    $scope.gridsterOpts = {
		margins: [20, 20],
		outerMargin: true,
		pushing: true,
		floating: true,
		draggable: {
			enabled: true
		},
		resizable: {
			enabled: true,
			handles: ['n', 'e', 's', 'w', 'se', 'sw']
		}
	};
        $scope.content1="<h3>Heading325</h3><br/><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam53.</p>";
          $scope.option_ckeditor1 = {
    language: 'en',
    allowedContent: true,
    entities: false
  };
    // these map directly to gridsterItem options
	$scope.standardItems = [{
		sizeX: 6,
		sizeY: 2,
		row: 0,
		col: 0,
                
		content:'<div contenteditable="true"> <img src="images/img/f-img.jpg" alt="banner image" height="220px" width="100%"></div>'
	}
        , {
		sizeX: 3,
		sizeY: 2,
		row: 2,
		col: 0,
                
		content:'<div contenteditable="true" style="text-align:justify;">  <h3>Heading</h3>Edit<br/><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet</p></div>'
	}, {
		sizeX: 3,
		sizeY: 2,
		row: 2,
		col: 3,
                
		content:' <div contenteditable="true">  <h3>Heading</h3>Edit<br/><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet</p></div>'
	}, {
		sizeX: 6,
		sizeY: 2,
		row: 4,
		col: 0,
                
		content:'<div contenteditable="true" style="float:left;width:60%;text-align:justify; padding-right:20px;">Edit<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p></div><div style="float:left;width:40%;"> <img src="images/img/s-img.jpg" alt="banner imageee" height="220px" width="100%"></div>'
	}, {
		sizeX: 4,
		sizeY: 1,
		row: 6,
		col: 0,
               
		content:' <div> <img src="images/img/f-img.jpg" alt="banner imageee" height="125px" width="100%"></div>'
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 6,
		col: 4,
               
		content:' <div ckeditor="option_ckeditor1" name="content1"  required ng-model="content1" contenteditable="true" value="" style="text-align:justify;"></div>'
	}, {
		sizeX: 6,
		sizeY: 1,
		row: 7,
		col: 0,
                
		content:'<div id="footerid" contenteditable="true"><p id="footerdata">Footer content will be shown here.</p></div>' 
	}
	];
    
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
angular.module('alisthub').filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){	
    return $sce.trustAsHtml(htmlCode);
  }
}]);