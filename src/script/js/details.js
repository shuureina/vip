;
! function() {
    //1.获取对应详情页的id
    var picid = location.search.substring(1).split('=')[1];
    const phpurl = 'http://10.31.158.73:8080/vip/php/';
    var valnum = Number($("#count").val());
    var addnum = 1;
    //2.将当前的id传给后端获取对应的数据
    $.ajax({
        type: "post",
        url: phpurl + 'details.php',
        dataType: "json",
        data: {
            picid: picid
        }
    }).done(function(data) {
        console.log(data);
        $('.pic-s img').attr('src', data.url);
        $('.pic-s img').attr('picid', data.picid);
        $('.pic-b img').attr('src', data.url);
        $('.title h2').html(data.title);
        $('.price span').html(data.price);
        let surlarr = data.bimgurls.split(',');
        // console.log(surlarr);
        let templist = '';
        $.each(surlarr, function(index, value) {
            templist += '<li><img src="' + value + '" alt="' + index + '"></li>';
        });
        $('.movelist ul').append(templist);
    })



    //3.购物车存储核心：商品的sid和商品的数量--cookie或者localStorage进行存储
    var arrid = []; //商品的Id
    var arrnum = []; //商品的数量
    function cookietoString() {
        if ($.cookie('cookieid') && $.cookie('cookienum')) { //判断是第一次还是多次存储
            arrid = $.cookie('cookieid').split(','); //存储商品的id
            arrnum = $.cookie('cookienum').split(','); //存储商品的数量
        }
    }
    // console.log(valnum);
    $('#sub-btn').on('click', function() { //点击加入购物车按钮
        var $picid = $(this).parents('.product').find('.pic-s img').attr('picid'); //
        cookietoString() //获得cookietoString存储数据
            // console.log($.inArray($picid, arrid));
            //判断当前的picid是否存在cookie中
        if ($.inArray($picid, arrid) === -1) { //不存在 存入cookie中
            arrid.push($picid);
            $.cookie('cookieid', arrid.toString(), 7);
            arrnum.push($("#count").val());
            $.cookie('cookienum', arrnum.toString(), 7);

        } else { //不返回-1 存在
            var num = Number(arrnum[$.inArray($picid, arrid)]) + valnum; //累加
            arrnum[$.inArray($picid, arrid)] = num;
            // console.log(arrnum);
            $.cookie('cookienum', arrnum.toString(), 7); //再次存入cookie中
        }
        $('.pop').css('display', 'block');
        $('.close').on('click', function() {
            $('.pop').css('display', 'none');
            clearInterval(judgetimer);
        })
        let count = 5;

        let judgetimer = setInterval(function() {
            $('.time').html(count);
            if (count <= 0) {
                clearInterval(judgetimer);
                $('.pop').css('display', 'none');
            }
            count--;
        }, 1000);
    });

    //4.数量的加减
    $('.num-add').on('click', function() {
        // addnum++;
        $("#count").val(function() {
            valnum = Number($(this).val()) + addnum;
            return valnum;
        })
    });

    $('.num-cut').on('click', function() {
        // addnum++;

        if (valnum >= 1) {
            $("#count").val(function() {
                valnum = Number($(this).val()) - addnum;
                return valnum;
            });
        } else {

            $('.num-cut').css('cursor', 'not-allowed').off();
        }
    });



}();
//4.放大镜效果
;
(function($) {
    const $small = $('.pic-s');
    const $smallpic = $('.pic-s img');
    const $bigpic = $('.pic-b img');
    const $big = $('.big-box');
    const $movebox = $('.pic-s .small');
    const $product = $('.product');
    const $icnlists = $('.movelist ul');
    const $leftbtn = $('.left');
    const $rightbtn = $('.right');
    let $num = 4; //m默认小图块显示4张图片

    let $wmove = $small.width() * $big.width() / $bigpic.width();
    let $hmove = $small.height() * $big.height() / $bigpic.height();
    let $scale = $bigpic.width() / $small.width();

    $movebox.width($wmove);
    $movebox.height($hmove);

    //1.鼠标移动  放大镜
    $small.hover(function() {
        $big.css("visibility", "visible");
        $movebox.css("visibility", "visible");
        $(this).on('mousemove', function(ev) {
            let $left = ev.clientX - $product.offset().left - $movebox.width() / 2;
            let $top = ev.clientY - $product.offset().top - $movebox.height() / 2;
            if ($left < 0) {
                $left = 0;
            } else if ($left >= $(this).width() - $movebox.width()) {
                $left = $(this).width() - $movebox.width();
            }
            if ($top < 0) {
                $top = 0;
            } else if ($top >= $(this).height() - $movebox.height()) {
                $top = $(this).height() - $movebox.height();
            }
            $movebox.css({
                left: $left,
                top: $top
            });
            $bigpic.css({
                left: -$left * $scale,
                top: -$top * $scale
            });
        })
    }, function() {
        $big.css("visibility", "hidden");
        $movebox.css("visibility", "hidden");
    });

    //2.1小图滚动和点击切换相应图标
    $icnlists.on('click mouseover', 'li', function() {
        let $changeimg = $(this).find('img').attr('src');
        // console.log($(this).find('img'));
        $smallpic.attr('src', $changeimg);
        $bigpic.attr('src', $changeimg);
    });
    //2.2点击左右箭头
    $leftbtn.on('click', function() {
        let $listitems = $icnlists.find('li');
        let $listitemw = $listitems.eq(0).width() + 13; //每个li的宽度（包括margin）
        console.log($listitemw);

        if ($listitems.length > $num) { //ul里的li的数量>num
            $num++;
            if ($listitems.length === $num) {
                $leftbtn.css('color', '#fff');
                $rightbtn.css('color', '#f10180');
            }
            $icnlists.animate({ left: -($num - 4) * $listitemw + $leftbtn.width() + 8 })
            console.log($num);
        }
    });
    console.log($num);
    $rightbtn.on('click', function() {
        console.log($num);

        let $listitems = $icnlists.find('li');
        let $listitemw = $listitems.eq(0).width() + 13; //每个li的宽度（包括margin）
        console.log($listitemw);
        if ($num > 4) { //ul里的li的数量>num
            $num--;
            if ($num === 4) {
                $rightbtn.css('color', '#fff');
                $leftbtn.css('color', '#f10180');
            }
            $icnlists.animate({ left: -($num - 4) * $listitemw + $rightbtn.width() + 8 })
        }
    });

})(jQuery);