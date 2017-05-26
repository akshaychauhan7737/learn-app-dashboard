(function () {
    'use strict';
    angular.module('bitsaa')
      .constant('AppConfig', AppConfig())

    function AppConfig() {
        return {
            app            : {
                name : 'Learning App',
            },
            facebookAppId  : '',
            parse          : {
               appId : 'APPLICATION_ID',
              server: 'https://akshaychauhan.herokuapp.com/parse'
              },
            devHeight :   window.innerHeight,
            devWidth  :   window.innerWidth

        };
    }
})();
