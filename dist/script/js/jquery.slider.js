"use strict";!function(u){u.fn.extend({slider:function(){u(this).each(function(n,t){var i=u(t).find(".focus-banner-con"),e=u(t).find(".fbc-trigger-con"),c=u(t).find(".fbc-trigger-line"),f=u(t).find(".fbc-list"),o=u(t).find(".fbc-btn-left"),l=u(t).find(".fbc-btn-right"),a=0,r=null;function s(){var n=(f.width()-390)/2+195*a;f.children("li").eq(a).addClass("show").siblings().removeClass("show"),c.stop(!0).animate({left:n})}e.on("click",function(n){var t=(n=n||event).target||src.Element;"LI"===t.nodeName&&(a=u(t).index(),s())}),i.hover(function(){o.stop(!0).animate({left:0},1),l.stop(!0).animate({right:0},1),clearInterval(r)},function(){o.stop(!0).animate({left:-33},1),l.stop(!0).animate({right:-33},1),r=setInterval(function(){l.click()},2e3)}),e.hover(function(){clearInterval(r)},function(){r=setInterval(function(){l.click()},2e3)}),l.on("click",function(){1<++a&&(a=0),s()}),o.on("click",function(){--a<0&&(a=1),s()}),r=setInterval(function(){l.click()},2e3)})}})}(jQuery);