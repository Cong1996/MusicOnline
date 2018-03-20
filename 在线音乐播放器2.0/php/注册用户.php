<?php
 header('Content-type:text/html;charset=utf-8');

$userName=$_POST['userName'];
$userPassword=$_POST['userPassword'];
$userPhone=$_POST['userPhone'];
$type=2;
$servername = "localhost";
$username = "root";
$password = "Cong19960623";
$dbname = "musiccommont";
 
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
 $sql="INSERT INTO user(user_name,user_password,user_phone,user_type)VALUES('$userName','$userPassword','$userPhone','$type')";
         $result=mysqli_query($conn,$sql);
mysqli_close($conn);
?>