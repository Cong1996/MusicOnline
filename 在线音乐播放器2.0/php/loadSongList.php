<?php
header("Content-Type: text/html;charset=utf-8");
$servername="localhost";
$username="root";
$password="Cong19960623";
$dbname="musiccommont";
$obj=array();

$conn=mysqli_connect($servername,$username,$password,$dbname);
if(!$conn){
	die("Lost connect");
}
$count=0;
$sql="SELECT song_name,singer_name,song_src,song_lrc FROM song";

$result=mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0){
	while($row=mysqli_fetch_assoc($result)){
		$obj[$count]=$row;
		$count++;
	}
}
echo json_encode($obj);
mysqli_close($conn);
?>