<?php

include("config.php");

$nightliesDirectories = scandir($nightlyBuildsDirectory, 1);
array_splice($nightliesDirectories, -2);

$getArtifactInfoFiles = function($buildDirectory) use ($nightlyBuildsDirectory, $artifactInfoFileName) { 
    return $nightlyBuildsDirectory . "/" . $buildDirectory . "/" . $artifactInfoFileName; 
};

$nightlyBuildsJson = array_map($getArtifactInfoFiles, $nightliesDirectories);

$decodeArtifactInfo = function($artifactInfo) { 
    $artifactInfoContent = file_get_contents($artifactInfo);
    return json_decode($artifactInfoContent); 
};

$artifactInfoJson = array_map($decodeArtifactInfo, $nightlyBuildsJson);

echo json_encode($artifactInfoJson, JSON_PRETTY_PRINT);

?>