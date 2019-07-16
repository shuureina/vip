
<?php  
	
	include "conn.php";
	
	if(isset($_POST['picid'])){

		$id=$_POST['picid'];
		
		$result=$conn->query("select * from piclist where picid=$id ");
		$arr=array();
		$arr=$result->fetch_assoc();
		
		echo json_encode($arr);
	}
