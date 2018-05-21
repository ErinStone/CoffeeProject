var app = angular.module('roastApp');

//list controller displays static data
app.controller("RoastListController", ['$log', function ($log) {
    $log.info("in roastListController");

}]) //end RoastListController

//detail controller displays static data, allows for update of notes field and for deleting 
app.controller("RoastDetailController", ['$log', function ($log) {
    $log.info("in roastDetailController");

    var ctrl = this;

    ctrl.updateRoast = function () {
        $log.info("in detail controller updateRoast");
        var data = {
            id: ctrl.roast.id,
            description: ctrl.roast.description
        };
        ctrl.onUpdateRoast({ data: data });
    }

    ctrl.deleteRoast = function () {
        $log.info("delete roast");
        var data = {id: ctrl.roast.id};
        ctrl.onDeleteRoast({data: data});

    }

}]); //end RoastDetailController

//add controller handles creating new roasts and knows only of it's parent and the service
app.controller("RoastAddController", ["RoastService", '$log', function (roastService, $log) {
    $log.info("in roastAddController");

    var ctrl = this;
    ctrl.roast = [];

    ctrl.$onInit = function () {
        roastService.getProfiles()
            .then(function (response) {
                ctrl.profiles = response;
                roastService.getRegions()
                    .then(function (response) {
                        ctrl.regions = response;
                        roastService.getCountries()
                            .then(function (response) {
                                ctrl.countries = response;
                                roastService.getAreas()
                                    .then(function (response) {
                                        ctrl.areas = response;
                                    })
                            })
                    })
            })
    }



    ctrl.addRoast = function () {
        $log.info("addRoast");
        var data = {
            name: ctrl.name,
            weight: ctrl.weight,
            profile: ctrl.profile,
            region: ctrl.region,
            area: ctrl.area,
            country: ctrl.country,
            description: ctrl.description
        };

        ctrl.addForm.$setPristine();
        ctrl.addForm.$setUntouched();
        ctrl.name = ctrl.weight = ctrl.profile = ctrl.region = ctrl.area = ctrl.country = ctrl.description = '';

        ctrl.onAddRoast({data : data});
    }

    ctrl.haveCountriesForRegion = function () {
        var retVal = false;
        if (ctrl.regions && ctrl.countries) {
            for (var index = 0; index < ctrl.countries.length; ++index) {
                var country = ctrl.countries[index];
                if (country.region == ctrl.region) {
                    retVal = true;
                    break;
                }
            }
        }
        return retVal;
    }

    ctrl.haveAreasForCountry = function () {
        var retVal = false;
        if (ctrl.countries && ctrl.areas) {
            for (var index = 0; index < ctrl.areas.length; ++index) {
                var area = ctrl.areas[index];
                if (area.country == ctrl.country) {
                    retVal = true;
                    break;
                }
            }
        }
        return retVal;
    }

    ctrl.selectedProfileById = function (id) {
        var retVal = "";
        if (ctrl.profiles) {
            for (var index = 0; index < ctrl.profiles.length; ++index) {
                var profile = ctrl.profiles[index];
                if (profile.id == id) {
                    retVal = profile.description;
                    break;
                }
            }
        }
        return retVal;
    }

}]); //end roastAddController



//main controller manages it's own view state and dispatches to its children / listens to its children
// has dependency on the service
app.controller("RoastMainController", ["RoastService", '$log', '$state', function (roastService, $log, $state) {
    $log.info("in roastMainController");

    var self = this;

    self.$onInit = function () {

        roastService.getRoasts()
            .then(function (response) {
                self.roasts = response;
            })

    }


    self.updateRoast = function (data) {
        $log.info("updated roast in main controller");
        roastService.updateRoast(data)
            .then(function (response) {
                $state.go('welcome');
            })

    }

    self.deleteRoast = function (data) {
        $log.info("delete roast in main controller");
        roastService.deleteRoast(data.id)
            .then(function (response) {
                roastService.getRoasts()
                    .then(function (response) {
                        self.roasts = response;
                        $state.go('welcome');
                    })
            })
    }

    self.addRoast = function (data) {
        $log.info("addroast in main controller");
        roastService.addRoast(data).then(function (response) {
            roastService.getRoasts()
                .then(function (response) {
                    self.roasts = response;
                    $state.go('welcome');
                })
        });
    }

}]); //end roastMainController







