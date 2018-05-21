var app = angular.module('roastApp');


app.service("RoastService", function ($http) {


    function getRoasts() {
        return $http.get("api/roasts")
            .then(function (response) {
                return response.data;
            });
    }

    function getRoast(id) {
        return $http.get("api/roasts/" + id)
            .then(function (response) {
                return response.data;
            });
    }

    function deleteRoast(id){
        return $http.delete("api/roasts/" + id)
            .then(function(response){
                return response.data;
            })
    }

    function updateRoast(data) {
        return $http.put("api/roasts/" + data.id, JSON.stringify(data))
            .then(function (response) {
                return response.data;
            })

    }

   

    function addRoast(data) {
        return $http.post("api/roasts", JSON.stringify(data))
            .then(function (response) {
                return response.data;
            })
    }

    function getProfiles() {
        return $http.get("api/profiles")
            .then(function (response) {
                return response.data;
            });
    }

    function getCountries() {
        return $http.get("api/countries")
            .then(function (response) {
                return response.data;
            })
    }

    function getAreas() {
        return $http.get("api/areas")
            .then(function (response) {
                return response.data;
            })
    }

    function getRegions() {
        return $http.get("api/regions")
            .then(function (response) {
                return response.data;
            })
    }

    return {
        getRoasts: getRoasts,
        getRoast: getRoast,
        updateRoast: updateRoast,
        addRoast: addRoast,
        getProfiles: getProfiles,
        getCountries: getCountries,
        getAreas: getAreas,
        getRegions: getRegions,
        deleteRoast: deleteRoast
    };

});