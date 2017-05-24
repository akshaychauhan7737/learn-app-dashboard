app.Config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

      // setup an abstract state for the tabs directive
     
       .state('login', {
        url: '/login',
        templateUrl: 'production/login.html',
        controller: 'loginCtrl',
        controllerAs: 'login'
      })
	  .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'production/side.html',
        controller: 'menuCtrl',
        controllerAs: 'menu'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menu-content': {
            templateUrl: 'production/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
          }
        }
      })
      .state('app.story', {
        url: '/story',
        views: {
          'menu-content': {
            templateUrl: 'production/story.html',
            controller: 'storyCtrl',
            controllerAs: 'story'
          }
        }
      })
	  $urlRouterProvider.otherwise('/login');
})