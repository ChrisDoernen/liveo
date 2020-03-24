<?php 

include("config.php");

$directories = scandir($nightlyBuildsDirectory, 1);
array_splice($directories, -2);

$filesToDelete = array_splice($directories, $numberOfNightlyBuildsToKeep);

function rrmdir($dir) { 
    if (is_dir($dir)) { 
      $objects = scandir($dir);
      foreach ($objects as $object) { 
        if ($object != "." && $object != "..") { 
          if (is_dir($dir. DIRECTORY_SEPARATOR .$object) && !is_link($dir."/".$object))
            rrmdir($dir. DIRECTORY_SEPARATOR .$object);
          else
            unlink($dir. DIRECTORY_SEPARATOR .$object); 
        } 
      }
      rmdir($dir); 
    } 
  }

$deleteDirectory = function($directory) use ($nightlyBuildsDirectory) {
    $nightlyBuildDirectory = $nightlyBuildsDirectory . "/" . $directory;
    rrmdir($nightlyBuildDirectory);
};

array_map($deleteDirectory, $filesToDelete);

echo "."

?>