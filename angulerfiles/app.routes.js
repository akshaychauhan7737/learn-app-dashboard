angular.module("bitsaa",['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	.state('login', {
		url: "/login",
		templateUrl: "templates/login.html",
		controller: 'loginCtrl',
        controllerAs: 'login'
	  })
	  .state('Editstory', {
		url: "/Editstory",
		templateUrl: "templates/Editstory.html",
		controller: 'EditSoCtrl',
        controllerAs: 'Editstory'
	  })
	  .state('home', {
		url: "/home",
		templateUrl: "templates/home.html",
		controller: 'homeCtrl',
        controllerAs: 'home'
	  })
  $urlRouterProvider.otherwise('/login')		
		
  
  
});