var app = angular.module('roastApp');

//static controller - no reference to any service bc it doesn't need one
app.controller("RoastWelcomeController", ['$log', function ($log) {
    $log.info("in roastWelcomeController");
}]);

//list controller displays static data, handles passing off selection to parents and siblings
app.controller("RoastListController", ["RoastService", '$log', '$rootScope', function (roastService, $log, $rootscope) {
    $log.info("in roastListController");

    var ctrl = this;
    ctrl.$onInit = function () {

        roastService.getRoasts()
            .then(function (response) {
                ctrl.roasts = response;
            })

    }

    ctrl.setRoast = function (roast_id) {
         //sends event out to all app components who might be listening on $rootscope 
        $rootscope.$emit('setRoast', roast_id);
    }

    //specifically listening on rootscope for the getRoasts event
    $rootscope.$on('getRoasts', function (event, data) {
        roastService.getRoasts()
            .then(function (response) {
                ctrl.roasts = response;
            })
    })


}]) //end RoastListController

//detail controller displays static data, allows for update of notes field and for deleting 
//  handles passing off updates/delete notifications to parents and siblings
app.controller("RoastDetailController", ["RoastService", '$log', '$rootScope', function (roastService, $log, $rootscope) {
    $log.info("in roastDetailController");

    var ctrl = this;

    ctrl.$onInit = function(){
        ctrl.roast = [];
    }
    
    //specifically listening on rootscope for the setRoast event
    $rootscope.$on('setRoast', function (event, data) {
        $log.info("roast is: " + data);
        roastService.getRoast(data)
            .then(function (response) {
                ctrl.roast = response;
            })
    })

    ctrl.updateRoast = function () {
        $log.info("updateRoast");
        roastService.updateRoast(ctrl.roast['roast_id'], ctrl.roast['description'])
            .then(function (response) {
                 //sends event out to all app components who might be listening on $rootscope and on $scope;
                $rootscope.$broadcast('getRoasts', response);
            })

    }

    ctrl.deleteRoast = function () {
        $log.info("delete roast");
        roastService.deleteRoast(ctrl.roast['roast_id'])
            .then(function (response) {
                //sends event out to all app components who might be listening on $rootscope 
                $rootscope.$emit('getRoasts', response);
            })
    }

}]); //end RoastDetailController

//add controller handles creating new roasts and knows only of it's parent and the service
app.controller("RoastAddController", ["RoastService", '$scope','$rootScope', '$log', function (roastService, $scope, $rootScope, $log) {
    $log.info("in roastAddController");

    var ctrl = this;
  
    ctrl.$onInit = function () {

        ctrl.regions = [];
        ctrl.profiles = [];
        ctrl.areas = [];
        ctrl.countries = [];
        ctrl.roast = [];
        
        fetchGeography();
        fetchProfiles();

    }

    function fetchProfiles() {
        roastService.getProfiles()
            .then(function (response) {
                ctrl.profiles = response;
            })

    };

    function fetchGeography() {
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

    //listens for event from parent only
    $scope.$on('createRoast', function (event, data) {
        ctrl.roast = [];
    })

    ctrl.addRoast = function () {
        roastService.addRoast(ctrl.roast['r_name'],
            ctrl.roast['weight'], ctrl.roast['p_name'],
            ctrl.roast['g_name'], ctrl.roast['c_name'],
            ctrl.roast['a_name'], ctrl.roast['description']
        )
            .then(function (response) {
                ctrl.roast = [];
                $rootScope.$broadcast('getRoasts', response);
            })
    }

    ctrl.haveCountriesForRegion = function () {
        var retVal = false;
        if (ctrl.regions.length > 0 && ctrl.roast) {
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
        if (ctrl.countries.length > 0 && ctrl.roast) {
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



    ctrl.selectedProfileById = function (id) {
        var retVal = "";
        if (ctrl.profiles.length > 0 && ctrl.roast) {
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
// has no dependency on the service bc it doesn't require one
app.controller("RoastMainController", ['$log', '$scope', '$rootScope', function ($log, $scope, $rootscope) {
    $log.info("in roastMainController");


    var self = this;
    self.hasRoast = false;
    self.isEditRoast = false;
    self.isNewRoast = false;


    self.createRoast = function () {
        self.hasRoast = true;
        self.isEditRoast = false;
        self.isNewRoast = true;
        $scope.$broadcast('createRoast', 0); //sends event only to listeners in children
    }

    $rootscope.$on('setRoast', function (event, data) {
        $log.info("roast_id is: " + data);
        self.hasRoast = true;
        self.isEditRoast = true;
        self.isNewRoast = false;
    })

    $rootscope.$on('getRoasts', function(event, data){
        self.hasRoast = false;
        self.isEditRoast = false;
        self.isNewRoast = false;
    })


}]); //end roastMainController