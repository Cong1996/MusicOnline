<?php
header('Content-Type:text/html;charset=utf-8');
$songName=$_POST['songName'];
$singerName=$_POST['singerName'];
$servername = "localhost";
$username = "root";
$password = "Cong19960623";
$dbname = "musiccommont";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("连接失败: " . mysqli_connect_error());
}
$sql="DELETE FROM song WHERE song_name='$songName' AND singer_name='$singerName'";
$result = mysqli_query($conn, $sql);
 
mysqli_close($conn);
?>