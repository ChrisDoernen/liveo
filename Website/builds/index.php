<?php

include("config.php");

$nightliesDirectories = scandir($nightlyBuildsDirectory, 1);
array_splice($nightliesDirectories, -2);

$artifactInfosJson = array();

foreach($nightliesDirectories as $nightlyDirectory) {
    $artifactDirectory = $nightlyBuildsDirectory . "/" . $nightlyDirectory;
    $artifactInfo = $artifactDirectory . "/" . $artifactInfoFileName;
    $artifactInfoContent = file_get_contents($artifactInfo);
    $artifactInfoJson = json_decode($artifactInfoContent);

    foreach($artifactInfoJson->artifacts as $artifact) {
        $artifact->link = $baseUrl . "/" . $artifactDirectory . "/" . $artifact->filename;
    }

    $artifactInfosJson[] = $artifactInfoJson;
}

echo json_encode($artifactInfosJson, JSON_PRETTY_PRINT);

?>