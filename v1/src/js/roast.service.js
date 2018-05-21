var app = angular.module('roastApp');

app.service("RoastService", function ($http) {

   
    function getRoasts(){
        return $http.get("api/roasts")
            .then(function (response) {
                return response.data;
            });
    }

    function getRoast(roast_id){
        return $http.get("api/roasts/" + roast_id)
            .then(function(response){
            return response.data;
        });
    }

    function deleteRoast(roast_id){
        return $http.delete("api/roasts/" + roast_id)
            .then(function(response){
            return response.data;
        });
    }

    function updateRoast(roast_id, roastdescription){
        var data = {id : roast_id, description : roastdescription};
        return $http.put("api/roasts/" + roast_id, JSON.stringify(data))
            .then(function(response){
                return response.data;
            })
        
    }

    function addRoast(rname, weight, power, region, country, area, description){
        var data = {rname : rname,
            weight : weight,
            power : power,
            region: region,
            area : area,
            country : country,
            description: description};
        return $http.post("api/roasts", JSON.stringify(data))
            .then(function(response){
                return response.data;
            })
    }

    function getProfiles(){
        return $http.get("api/profiles")
            .then(function(response){
                return response.data;
            });
    }

    function getCountries(){
        return $http.get("api/countries")
            .then(function(response){
                return response.data;
            })
    }

    function getAreas(){
        return $http.get("api/areas")
            .then(function(response){
                return response.data;
            })
    }

    function getRegions(){
        return $http.get("api/regions")
            .then(function(response){
                return response.data;
            })

    }

    return{
        getRoasts : getRoasts,
        getRoast : getRoast,
        deleteRoast : deleteRoast,
        updateRoast: updateRoast,
        addRoast : addRoast,
        getProfiles : getProfiles,
        getCountries : getCountries,
        getAreas : getAreas,
        getRegions : getRegions
    };

});