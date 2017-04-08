(function () {
    var app = angular.module('front-controllers');

    app.service('datacontext', ['$http', '$rootScope', function ($http, $rootScope) {
       
        var baseUrl = $rootScope.baseUrl;

        var service = {
            getPropertyTypes: getPropertyTypesImpl,
            getPresentationText: getPresentationTextImpl,
            getAdverts: getAdvertsImpl,
            getAdvertsWithParams: getAdvertsWithParamsImpl,
            getFavoriteAdverts: getFavoriteAdvertsImpl,

            sendMail: sendMailImpl
        }

        function getPropertyTypesImpl() {
            return $http.get(baseUrl + "property_types/");
        }

        function getPresentationTextImpl() {
            return $http.get(baseUrl + "company_info/1/");
        }

        function getAdvertsImpl(advert_type){
            return $http.get(baseUrl + "properties/?advert_type="+advert_type);
        }

        function getAdvertsWithParamsImpl(advert_type){
            var rech = "advert_type=" + advert_type;
            return $http.get(baseUrl + "properties/?" + rech);
        }

        function getFavoriteAdvertsImpl(){
            return $http.get(baseUrl + "properties/?is_favorite=True");
        }

        function sendMailImpl(subject, message){
            var data = {"subject":subject, "message":message};
            return $http.post(baseUrl + "email", data);
        }

        return service;
    }]);
})();