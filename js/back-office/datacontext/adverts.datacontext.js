(function () {
    var app = angular.module('quercy-back');

    app.service('adverts.datacontext', function ($http) {
       
        var baseUrl = "http://127.0.0.1:8000/api/";

        var service = {
            getProperties: getPropertiesImpl,
            getPropertyTypes: getPropertyTypesImpl
        }

        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getPropertiesImpl(advert_type) {
            return $http.get(baseUrl + "properties/");
        }

        return service;
    });
})();