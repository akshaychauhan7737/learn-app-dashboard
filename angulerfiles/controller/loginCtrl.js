angular.module('bitsaa')

  .controller('loginCtrl', function ($timeout,$rootScope,$scope,$state) {
    var  login = this;
	$timeout(function(){
		$rootScope.login=false;
		},20);
	
	
    /*--------------------------------D E C L A R A T I O N S----------------------------------------------*/
    
	/*--------------------------------F U N C T I O N S----------------------------------------------*/
	login.adminLogin=function(){
		
			 if($scope.login.username=="admin" && $scope.login.password=="admin")
			 {
				$rootScope.login=true;
				$state.go("home");
				
			 }else
			 {
				console.log($scope.login.username +" "+$scope.login.password);
				$rootScope.login=false;
				$scope.loginMessage="You entered Something Wrong";
				$scope.login=0;
			 }
		 };

    /*--------------------------------A P I  C A L L S----------------------------------------------*/


    /*--------------------------------R E D I R E C T I O N S----------------------------------------------*/

  })
  
