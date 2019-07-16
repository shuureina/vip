<?php
include ('conn.php');

    $result=$conn->query("select * from piclist");
	
	$arr=array();
	for ($i=0; $i <$result->num_rows; $i++) { 
		$arr[$i]=$result->fetch_array();
	}

	echo json_encode($arr);