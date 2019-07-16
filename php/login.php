<?php
include ('conn.php');
//后端获取前端的用户名和数据库进行匹配。
if(isset($_POST['loginName'])||isset($_POST['password'])){
    $loginName=$_POST['loginName'];
    $password=sha1($_POST['password']);
    // $password=$_POST['password'];
    
    $result =$conn->query("select * from vip_user where username='$loginName' and password='$password'");
 if($result->fetch_assoc()){
       echo 'true';//有值登录成功
 }else{
        echo 'false';//无值登陆失败
 }
}else{
    exit ("非法操作");
}


