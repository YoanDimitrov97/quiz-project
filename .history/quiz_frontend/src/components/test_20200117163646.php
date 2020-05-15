<?php
$ordinal_tr=array();
for ($i=1;$i<31;$i++) {
	$a = new \NumberFormatter("tr_TR", \NumberFormatter::ORDINAL);
	echo $a->format($i) . "\n"; 
	$ordinal_tr[$i]=$a->format($i);
}
echo json_encode($ordinal_tr)."\n\n";
?>