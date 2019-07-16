<?php

require "conn.php";


//后端获取前端的用户名和数据库进行匹配。
if(isset($_POST['loginName'])){
    $loginName=$_POST['loginName'];
    $result=$conn->query("select * from vip_user where username='$loginName'");
     if($result->fetch_assoc()){//如果有值代表用户名存在
         echo "true";//有重复
     }else{
         echo "false";//没有重复
     }
    
}else{
    exit ("非法操作");
}

//根据form内部name值获取前端表单提交的值
if(isset($_POST['submit']) && isset($_POST['agree'])){
    $loginName=$_POST['loginName'];
    $loginPhone=$_POST['loginPhone'];
    $loginEmail=$_POST['loginEmail'];
    // $password=$_POST['password'];
    $password=sha1($_POST['password']);
    $pvcode=$_POST['pvcode'];
    $conn->query("insert into vip_user values(null,'$loginName','$password','$loginPhone','$loginEmail','$pvcode',NOW())");
    header('location:http://10.31.158.73:8080/vip/dist/login.html');
}

 