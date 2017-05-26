angular.module('bitsaa',[]).run(function (AppConfig) {
    	Parse.initialize(AppConfig.parse.appId);
		Parse.serverURL=AppConfig.parse.server;
  });
