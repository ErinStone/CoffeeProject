<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/roasts', 'getRoasts');
$app->get('/roasts/:id', 'getRoast');
$app->get('/countries', 'getCountries');
$app->get('/regions', 'getRegions');
$app->get('/areas', 'getAreas');
$app->get('/profiles', 'getProfiles');
$app->post('/roasts', 'addRoast');
$app->put('/roasts/:id', 'updateRoast');
$app->delete('/roasts/:id', 'deleteRoast');

$app->run();

function get($sql){
	try{
		$db = getConnection();
		$stmt = $db->query($sql);
		$results = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		return json_encode($results);
	}catch(PDOException $e){
		return '{"error":{"text":' . $e->getMessage() . '}}';
	}

}

function getRoasts() {
	$sql = "SELECT id, name FROM roast ORDER BY name";
	echo(get($sql));
}

function getCountries(){
	$sql = "SELECT id, name, region FROM country ORDER BY name";
	echo(get($sql));
}

function getRegions(){
	$sql = "SELECT id, name FROM region ORDER BY name";
	echo(get($sql));
}

function getAreas(){
	$sql = "SELECT id, name, country FROM area ORDER BY name";
	echo(get($sql));
}

function getProfiles(){
	$sql = "SELECT id, description, name FROM profile ORDER BY name";
	echo(get($sql));
}


function getRoast($id) {
	$sql = "SELECT roast.id, roast.creation as date_created, roast.weight as weight,
    roast.description as description, roast.name , 
    region.name as region, country.name as country,
    area.name as area, profile.name as profile, profile.description as profile_description
    FROM roast
    INNER JOIN angular_roasts.region ON angular_roasts.region.id = angular_roasts.roast.region
    INNER JOIN angular_roasts.profile ON angular_roasts.profile.id = angular_roasts.roast.profile
    LEFT JOIN angular_roasts.country ON angular_roasts.country.id = angular_roasts.roast.country
    LEFT JOIN angular_roasts.area ON angular_roasts.area.id = angular_roasts.roast.area
    WHERE roast.id = :id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$roast = $stmt->fetchObject();  
		$db = null;
		echo json_encode($roast); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function addRoast(){
	$request = Slim::getInstance()->request();
	$roast = json_decode($request->getBody());
	$created = date("Y-m-d H:i:s");
	$sql = "INSERT INTO roast (id, creation, weight, 
				profile, region, country, area, description, name)
			VALUES
				(0, :creation, :weight, :profile, :region, :country, :area, :description, :name )";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("creation", $created);
		$stmt->bindParam("weight", $roast->weight);
		$stmt->bindParam("profile", $roast->profile);
		$stmt->bindParam("region", $roast->region);
		$stmt->bindParam("country", $roast->country);
		$stmt->bindParam("area", $roast->area);
		$stmt->bindParam("description", $roast->description);
		$stmt->bindParam("name", $roast->name);
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
	$sql = "UPDATE roast SET description=:description WHERE id=:id";
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
	$sql = "DELETE FROM roast WHERE id=:id";
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
	$dbname="angular_roasts";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>