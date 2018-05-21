<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/roasts', 'getRoasts');
$app->get('/roasts/:id', 'getRoast');
$app->get('/countries', 'getCountries');
$app->get('/regions', 'getRegions');
$app->get('/areas', 'getAreas');
$app->get('/profiles', 'getProfiles');
$app->get('/region/:id', 'getCountriesForRegion');
$app->get('/country/:id', 'getAreasForCountry');
$app->post('/roasts', 'addRoast');
$app->put('/roasts/:id', 'updateRoast');
$app->delete('/roasts/:id', 'deleteRoast');

$app->run();

function getRoasts() {
	$sql = "select * FROM roast ORDER BY r_name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$roasts = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;		
		echo json_encode($roasts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function getRoast($id) {
	$sql = "SELECT roast.roast_id as roast_id, roast.date_created as date_created, roast.weight as weight,
    roast.description as description, roast.r_name as r_name, 
    geo_region.g_name as g_name, country.c_name as c_name,
    area.a_name as a_name, power_profile.p_name as p_name
    FROM roast
	INNER JOIN coffees.geo_region ON coffees.geo_region.geo_region_id = coffees.roast.geo_region
    INNER JOIN coffees.power_profile ON coffees.power_profile.power_profile_id = coffees.roast.power_profile
	LEFT JOIN coffees.country ON coffees.country.country_id = coffees.roast.country
    LEFT JOIN coffees.area ON coffees.area.area_id = coffees.roast.area
    WHERE roast_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$roast = $stmt->fetchObject();  
		$db = null;
		echo json_encode($roast);
		flush(); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getCountries(){
	$sql = "SELECT country_id as id, c_name, geo_region as g_id FROM country ORDER BY c_name";
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$countries = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($countries);
	}catch(PDOException $e){
		echo '{"error":{"text":' . $e->getMessage() . '}}';
	}
}

function getRegions(){
	$sql = "SELECT geo_region_id as id, g_name FROM geo_region ORDER BY g_name";
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$countries = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($countries);
	}catch(PDOException $e){
		echo '{"error":{"text":' . $e->getMessage() . '}}';
	}

}

function getAreas(){
	$sql = "SELECT area_id as id, a_name, country as c_id FROM area ORDER BY a_name";
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$countries = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($countries);
	}catch(PDOException $e){
		echo '{"error":{"text":' . $e->getMessage() . '}}';
	}

}

function getProfiles(){
	$sql = "SELECT power_profile_id as id, description, p_name FROM power_profile ORDER BY p_name";
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$countries = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($countries);
	}catch(PDOException $e){
		echo '{"error":{"text":' . $e->getMessage() . '}}';
	}
}

function getCountriesForRegion($id){
	$sql = "SELECT country.country_id as cid, country.c_name as name
		FROM geo_region
    	INNER JOIN country ON country.geo_region = geo_region.geo_region_id
    	WHERE geo_region.geo_region_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);  
		$db = null;
		echo json_encode($results); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}

function getAreasForCountry($id){
	$sql = "SELECT area.area_id as aid, area.a_name as area_name
    	FROM country
    	INNER JOIN area ON area.country = country.country_id
		WHERE country_id=:id";
		
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);  
		$db = null;
		echo json_encode($results); 
		
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addRoast(){
	$request = Slim::getInstance()->request();
	$roast = json_decode($request->getBody());
	$created = date("Y-m-d H:i:s");
	$sql = "INSERT INTO roast (roast_id, date_created, weight, 
				power_profile, geo_region, country, area, description, r_name)
			VALUES
				(0, :created, :weight, :power, :region, :country, :area, :description, :rname )";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("created", $created);
		$stmt->bindParam("weight", $roast->weight);
		$stmt->bindParam("power", $roast->power);
		$stmt->bindParam("region", $roast->region);
		$stmt->bindParam("country", $roast->country);
		$stmt->bindParam("area", $roast->area);
		$stmt->bindParam("description", $roast->description);
		$stmt->bindParam("rname", $roast->rname);
		$stmt->execute();
		$roast->id = $db->lastInsertId();
		$db = null;
		echo json_encode($roast); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function updateRoast($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$roast = json_decode($body);
	$sql = "UPDATE roast SET description=:description WHERE roast_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("description", $roast->description);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($roast); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteRoast($id) {
	$sql = "DELETE FROM roast WHERE roast_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="";
	$dbpass="";
	$dbname="coffees";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>