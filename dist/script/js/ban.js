"use strict";$(function(){var s=$(".fbc-list"),l=$(".fbc-trigger-con");$.ajax({type:"get",url:"http://10.31.158.73:8080/vip/php/ban.php",dateType:"json"}).done(function(t){var i=JSON.parse(t),a="",n="";$.each(i,function(t,i){a+=' <li class="fbc-list-item">\n                        <a href="http://10.31.158.73:8080/vip/src/details.html?sid='+i.picid+'" target="_blank" class="fbc_list_img" alt="">\n                            <img src="'+i.url+'" alt="'+i.title+'">\n                        </a>\n                    </li>\n                   ',n+="<li>"+i.title+"</li>"}),s.append(a),l.append(n),s.children().first().addClass("show"),l.children().first().append("<span>|</span>")})});