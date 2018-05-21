/* get regions */
SELECT * FROM coffees.geo_region LIMIT 1000;

/*get area */
SELECT * FROM coffees.area;

/*get countries */
Select * from coffees.country;

/*get profiles */
Select * from coffees.power_profile;

/*get raw roast data */
Select * from coffees.roast;

/*get roast data pretty */
Select roast.roast_id as rid, roast.date_created as create_date, roast.weight as weight,
    roast.description as summary, roast.r_name as roast_name, 
    geo_region.g_name as region, country.c_name as country,
    area.a_name as area, power_profile.p_name as profile
    FROM roast
    INNER JOIN coffees.geo_region ON coffees.geo_region.geo_region_id = coffees.roast.geo_region
    INNER JOIN coffees.country ON coffees.country.country_id = coffees.roast.country
    INNER JOIN coffees.area ON coffees.area.area_id = coffees.roast.area
    INNER JOIN coffees.power_profile ON coffees.power_profile.power_profile_id = coffees.roast.power_profile
    WHERE roast_id = 1;

/*get countries for region */
SELECT country.country_id as cid, country.c_name as countryName
		FROM geo_region
    	INNER JOIN country ON country.geo_region = geo_region.geo_region_id
    	WHERE geo_region.geo_region_id=1;

/*get areas for country */
Select area.area_id as aid, area.a_name as area_name
    FROM country
    INNER JOIN area ON area.country = country.country_id
    WHERE country_id = 1;

INSERT INTO roast (roast_id, date_created, weight, 
        power_profile, geo_region, country, area, description, r_name)
    VALUES
        (0, '2018-03-28', .25, 3, 1, 2, 0, 'my test roast', 'roast name');



