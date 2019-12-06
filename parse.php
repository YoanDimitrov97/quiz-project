<?php

$handle = fopen("text.txt", "r");
if ($handle) {
    $count = 0;
    while (($line = fgets($handle)) !== false) {
        $count++;
    }

    fclose($handle);
    echo $count;
} else {
    // error opening the file.
} 

?>