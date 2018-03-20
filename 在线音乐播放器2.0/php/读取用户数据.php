<?php
header("Content-Type: text/html; charset=utf-8");
$servername = "localhost";
$username = "root";
$password = "Cong19960623";
$dbname = "musiccommont";
$obj=array();
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
 $count=0;
$sql = "SELECT	user_name,user_password FROM user";
$result = mysqli_query($conn, $sql);
 
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {

		$obj[$count]=$row;	
		$count++;
	
    }
} 
echo json_encode($obj);
mysqli_close($conn);
?>