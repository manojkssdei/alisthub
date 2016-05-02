app.directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, ele, attr, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
					return null;
				}
				return parseInt(viewValue, 10);
			});
		}
	};
})



app.controller('MainCtrl', function($scope, $sce) {

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

	// these map directly to gridsterItem options
	$scope.standardItems = [{
		sizeX: 6,
		sizeY: 1,
		row: 0,
		col: 0,
		content:' <img src="image/f-img.jpg" alt="banner image" height="150px" width="100%">'
	}, {
		sizeX: 4,
		sizeY: 2,
		row: 1,
		col: 2,
		content:' <h3>Heading</h3><br/><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>'
	}, {
		sizeX: 2,
		sizeY: 2,
		row: 1,
		col: 0,
		content:' <img src="image/s-img.jpg" alt="banner image" height="330px" width="100%">'
	}, {
		sizeX: 6,
		sizeY: 1,
		row: 3,
		col: 0,
		content:'<div style="float:left;width:60%;text-align:justify; padding-right:20px;"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p></div><div style="float:left;width:40%;"> <img src="image/s-img.jpg" alt="banner imageee" height="150px" width="100%"></div>'
	}, {
		sizeX: 4,
		sizeY: 1,
		row: 4,
		col: 0,
		content:' <img src="image/s-img.jpg" alt="banner imageee" height="150px" width="100%">'
	}, {
		sizeX: 2,
		sizeY: 1,
		row: 4,
		col: 4,
		content:' <h3>Heading</h3><br/><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>'
	}, {
		sizeX: 6,
		sizeY: 1,
		row: 5,
		col: 0,
		content:' <p id="footerdata" onclick=return launchEditor("footerdata", "Footer content will be shown here">Footer content will be shown here.</p>'
	}];
	
	

})
app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
	console.log(htmlCode);
    return $sce.trustAsHtml(htmlCode);
  }
}]);


   var featherEditor = new Aviary.Feather({
       apiKey: '75a7351be279e84e',
       apiVersion: 3,
       theme: 'dark', // Check out our new 'light' and 'dark' themes!
       tools: 'all',
       appendTo: '',
       onSave: function(imageID, newURL) {
           var img = document.getElementById(imageID);
           img.src = newURL;
       },
       onError: function(errorObj) {
           alert(errorObj.message);
       }
   });
   function launchEditor(id, src) {
       featherEditor.launch({
           image: id,
           url: src
       });
      return false;
   }
