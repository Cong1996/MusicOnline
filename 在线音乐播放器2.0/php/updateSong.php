<?php
 header('Content-type:text/html;charset=utf-8');
$songName=$_POST['songName'];
$singerName=$_POST['singerName'];
$src=$_POST['src'];
$lrc=$_POST['lrc'];
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
  $sql="INSERT INTO song(song_name,singer_name,song_src,song_lrc)VALUES('$songName','$singerName','$src','$lrc')";
          $result=mysqli_query($conn,$sql);
mysqli_close($conn);
?>