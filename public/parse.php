<?php
/*$idName = readline("Enter 1 for Match, or enter 2 for Odds: ");

if($idName === 1)
    $name = "Match";
else 
    $name = "Odds";

$id = readline("Enter the ".$name." id: ");*/

$handle = fopen("text.txt", "r");
if ($handle) {
    $count = 0;
    while (($line = fgets($handle)) !== false) {
        if(preg_match('/matchid="."/', $line))
    }

    fclose($handle);
    echo $count;
} else {
    // error opening the file.
} 
?>