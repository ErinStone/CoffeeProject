var app = angular.module('roastApp');


app.controller("RoastMainController", ["RoastService", '$log', function (roastService, $log) {
    $log.info("in roastMainController");

    var ctrl = this;
    ctrl.roasts = [];
    ctrl.roast = [];
    ctrl.hasRoast = false;
    ctrl.isEditRoast = false;
    ctrl.isNewRoast = ctrl.hasRoast && !ctrl.isEditRoast;

    ctrl.profiles = [];
    ctrl.regions = [];
    ctrl.countries = [];
    ctrl.areas = [];

    var fetchRoasts = function () {
        roastService.getRoasts()
            .then(function (response) {
                ctrl.roasts = response;
            })
    };

    var fetchProfiles = function () {
        roastService.getProfiles()
            .then(function (response) {
                ctrl.profiles = response;
            })

    };

    var fetchGeography = function () {
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
    }


    ctrl.$onInit = function (){
         //now fetch roasts to see roasts list
        fetchRoasts();
    }
    
    ctrl.getRoast = function (roast_id) {
        if (ctrl.profiles.length == 0) {
            fetchProfiles();
        }
        roastService.getRoast(roast_id)
            .then(function (response) {
                ctrl.roast = response;
                ctrl.hasRoast = true;
                ctrl.isEditRoast = true;
                ctrl.isNewRoast = false;
            })

    }

    ctrl.deleteRoast = function(){
        roastService.deleteRoast(ctrl.roast['roast_id'])
            .then(function(response){
                ctrl.roast = [];
                fetchRoasts();
            })
    }

    ctrl.updateRoast = function () {
        roastService.updateRoast(ctrl.roast['roast_id'], ctrl.roast['description'])
            .then(function (response) {
                fetchRoasts();
            })
    }

    ctrl.newRoast = function () {
        if (ctrl.regions.length == 0) {
            fetchGeography();
        }
        if (ctrl.profiles.length == 0) {
            fetchProfiles();
        }
        ctrl.hasRoast = true;
        ctrl.roast = [];
        ctrl.isEditRoast = false;
        ctrl.isNewRoast = true;
    }


    ctrl.addRoast = function () {
        roastService.addRoast(ctrl.roast['r_name'],
            ctrl.roast['weight'], ctrl.roast['p_name'],
            ctrl.roast['g_name'], ctrl.roast['a_name'],
            ctrl.roast['c_name'], ctrl.roast['description']
        )
            .then(function (response) {
                fetchRoasts();
            })
    }

    
    ctrl.haveCountriesForRegion = function () {
        var retVal = false;
        if (ctrl.regions.length > 0) {
            for (var index = 0; index < ctrl.countries.length; ++index) {
                var country = ctrl.countries[index];
                if (country.g_id == ctrl.roast.g_name) {
                    retVal = true;
                    break;
                }
            }
        }
        return retVal;
    }

    ctrl.haveAreasForCountry = function () {
        var retVal = false;
        if (ctrl.countries.length > 0) {
            for (var index = 0; index < ctrl.areas.length; ++index) {
                var area = ctrl.areas[index];
                if (area.c_id == ctrl.roast.c_name) {
                    retVal = true;
                    break;
                }
            }
        }
        return retVal;
    }

    ctrl.selectedProfileByName = function(name){
        var retVal = "";
        if(ctrl.profiles.length > 0){
            for(var index = 0; index < ctrl.profiles.length; ++index){
                var profile = ctrl.profiles[index];
                if(profile.p_name == name){
                    retVal = profile.description;
                    break;
                }
            }
        }
        return retVal;
    }
    
    ctrl.selectedProfileById = function(id){
        var retVal = "";
        if(ctrl.profiles.length > 0){
            for(var index = 0; index < ctrl.profiles.length; ++index){
                var profile = ctrl.profiles[index];
                if(profile.id == id){
                    retVal = profile.description;
                    break;
                }
            }
        }
        return retVal;
    }
    
   

}]); //end roastMainController







