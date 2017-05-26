angular.module('bitsaa')

  .controller('homeCtrl', function ($timeout,$rootScope,$scope,$state) {
    var  home = this;
	$timeout(function(){
		$rootScope.login=true;
	});
			
		 
    /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/
    
	/*--------------------------------F U N C T I O N S----------------------------------------------*/
		$rootScope.gotoHOME=function()
		{
			$state.go("home");
		};
		
		$rootScope.gotoEditStory=function()
		{
			$state.go("Editstory");
		};
		
    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
  
