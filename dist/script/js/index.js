"use strict";!function(){var t=$(".shop-sort .J-brand-item-data"),e=$(".shop-coming .J-brand-item-data"),o=$(".J-index-floor"),c=$(".index-nav-item"),n=$("#J_sbar_top"),i=$(".vipSidebarFont:not('.i-sidebarcom-cart')");$(window).on("scroll",function(){$("img").lazyload({effect:"fadeIn"})}),$.ajax({url:"http://10.31.158.73:8080/vip/php/index.php",dateType:"json"}).done(function(n){var i=JSON.parse(n),a="",s="",o="";$.each(i,function(n,i){a='\n                        <a href="details.html?picid='+i.picid+'" class="brand-item-hover" target="_blank">\n                            <img data-original="'+i.indexurl+'" alt="'+i.title+'" class="lazy">\n                            <div class="brand-info"><span class="brand-name" title="'+i.title+'">'+i.title+'</span>\n                                <div class="brand-discount-pms">\n                                    <span class="brand-discount"><span class="dis-num">'+i.sell+"</span>折起</span>\n                                </div>\n                            </div>\n                        </a>\n                  ",s+='<div class="brand-item">'+a+' <span class="ui-btn-fav-like" role="button">\n            <a class="vipFont"><svg class="icon" aria-hidden="true">\n            <use xlink:href="#icon-shoucang11\n            "></use>\n            </svg></a>\n            <span class="fav-hidden">收藏品牌</span>\n    </span></div>',o+='<div class="brand-item">'+a+'<div class="book-notice"></div></div>'}),t.html(s),e.html(o)}),$(window).on("scroll",function(){var s=$(window).scrollTop(),n=$(".index-content-wrp").offset().top;$("#vip-common-header").height()<s?$("#J_main_nav").addClass("main-nav-be-fixedtrans"):$("#J_main_nav").removeClass("main-nav-be-fixedtrans"),n<s?$("#J-index-nav-sort").addClass("is-lift-nav-fixed"):$("#J-index-nav-sort").removeClass("is-lift-nav-fixed"),o.each(function(n,i){var a=o.eq(n).offset().top;if(s<=a)return c.removeClass("curr"),c.eq(n).addClass("curr"),!1})}),c.on("click",function(){$(this).addClass("curr").siblings().removeClass("curr");var n=o.eq($(this).index()).offset().top;$("html,body").animate({scrollTop:n})}),$(".top-nav-tool>li").not(":first").each(function(){$(this).hover(function(){$(this).find("div").show()},function(){$(this).find("div").hide()})}),$("#J_main_nav_category").hover(function(){$(".cate-menu").show(),$(".cate-menu").hover(function(){$(this).show()},function(){$(this).hide()})},function(){$(".cate-menu").hide()}),i.each(function(){$(this).hover(function(){$(this).parent("div").find(".sidebarcom-hover").css("right","36px"),$(this).css({"background-color":"#fff",color:"#f10180"}),$(this).find(".sidebarcom-my-name").css("color","#f10180")},function(){$(this).parent("div").find(".sidebarcom-hover").css("right","-120px"),$(this).css({"background-color":"",color:""}),$(this).find(".sidebarcom-my-name").css("color","")})}),n.on("click",function(){$("html,body").animate({scrollTop:0})}),$(".footer").load("footer.html")}();