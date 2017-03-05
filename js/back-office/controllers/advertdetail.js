(function () {
    angular.module('quercy-back')
        .controller('advertdetail.controller', ['$scope', '$routeParams', 'adverts.datacontext', 'Notification',
            function ($scope, $routeParams, datacontext, Notification) {

                var advert_id = $routeParams["advert_id"];
                $scope.advert = {};
                $scope.property_types = [];
                $scope.heating_types = [];
                $scope.kitchen_types = [];

                function main(){
                    if (advert_id == "creation") {
                        $scope.advert = {
                            "advert_type": "V",
                            "state": "L",
                            "title_fr": "",
                            "title_en": "",
                            "description_fr": "",
                            "description_en": "",
                            "nb_rooms": undefined,
                            "price": undefined,
                            "address": "",
                            "postal_code": "",
                            "city": "",
                            "living_surface": undefined,
                            "total_surface": undefined,
                            "construction_year": undefined,
                            "nb_floors": 1,
                            "energy_consumption": undefined,
                            "gas_emission": undefined,
                            "is_favorite": false,
                            "property_type": "Appartement",
                            "heating_type": "Electrique",
                            "kitchen_type": "Equipée"
                        };
                    } else {
                        datacontext.getAdvert(advert_id)
                            .then(function (res) {
                                $scope.advert = res.data;
                                // Champs de type "decimal" sont renvoyés en chaine, donc convertion
                                $scope.advert.price = Number($scope.advert.price);
                                $scope.advert.living_surface = Number($scope.advert.living_surface);
                                $scope.advert.total_surface = Number($scope.advert.total_surface);
                                $scope.advert.energy_consumption = Number($scope.advert.energy_consumption);
                                $scope.advert.gas_emission = Number($scope.advert.gas_emission);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }

                    datacontext.getPropertyTypes()
                        .then(function (res) {
                            $scope.property_types = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    datacontext.getHeatingTypes()
                        .then(function (res) {
                            $scope.heating_types = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                    datacontext.getKitchenTypes()
                        .then(function (res) {
                            $scope.kitchen_types = res.data;
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }

                main();

                $scope.save = function(){
                    if ($scope.advert.id) {
                        // Annonce existante
                        datacontext.saveAdvert($scope.advert)
                            .then(function (res) {
                                Notification.success("Modifications enregistrées !");
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    } else {
                        // Nouvelle annonce
                        datacontext.createAdvert($scope.advert)
                            .then(function (res) {
                                Notification.success("Annonce créée !");
                                $scope.advert.id = res.data.id;
                            })
                            .catch(function (err) {
                                Notification.error("Une erreur est survenue lors de l'enregistrement.");
                                console.log(err);
                            });
                    }
                }

                $scope.toggleFavorite = function(){
                    $scope.advert.is_favorite = !$scope.advert.is_favorite;
                    $scope.save();
                }

            }]);

})();