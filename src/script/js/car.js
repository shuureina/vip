;
! function() {
    const phpurl = 'http://10.31.158.73:8080/vip/php/';
    const sec = $('.J_operate_countDown_sec');
    const min = $('.J_operate_countDown_min');
    const order = $('.orders-bd');
    const J_goods_item = $('.J_goods_item');
    const coupons = $('.coupons-wrapper');
    const empty = $('.empty');

    var countdown = 60;
    var countm = 30;

    //1.后端获取数据并渲染
    function productlist(id, num) {
        $.ajax({
            url: phpurl + "car.php",
            dataType: "json"
        }).done(function(data) {
            // console.log(data);

            $.each(data, function(index, value) {
                // console.log(value);
                if (id === value.picid) { //遍历判断id是否与传入的id相同，如果相同就渲染与之对应的数据
                    var $clonegoods = J_goods_item.clone(true, true); //克隆商品列表
                    $clonegoods.find('.product-pic a').attr('href', 'details.html?id=' + value.picid);
                    $clonegoods.find('.product-title a').attr({
                        'href': 'details.html?id=' + value.picid,
                        "title": value.title
                    }); //给商品连接添加对应的商品详情连接
                    $clonegoods.find('.product-title a').text(value.title);
                    $clonegoods.find('.product-pic img').attr('src', value.url);
                    $clonegoods.find('.product-pic img').attr('picid', value.picid);

                    $clonegoods.find('.m-price .u-price').text(value.price);
                    $clonegoods.find('.market-price .u-price').text((value.price * value.sell).toFixed(2));
                    $clonegoods.find('.J_cart_num').val(num);
                    $clonegoods.find('.subtotal-price .u-price').html((value.price * num).toFixed(2));
                    $clonegoods.css('display', 'block');
                    $('.orders-bd').append($clonegoods);
                    sumprice() //执行计算总价函数
                }
            });
        })
    }
    ////2.判断cookie 数据是否存在
    if ($.cookie('cookieid') && $.cookie('cookienum')) { //判断cookie 数据是否存在
        var arrid = $.cookie('cookieid').split(','); //存储商品的id
        var arrnum = $.cookie('cookienum').split(','); //存储商品的数量
        $.each(arrid, function(i, value) {
            productlist(arrid[i], arrnum[i]);
        });
        empty.css('display', 'none');
        coupons.css('display', 'block');
        //cookie数据存在执行计时器
        let timer = setInterval(function() {
            countdown--;
            sec.html(parseInt(countdown));
            if (parseInt(countdown) === 0) {
                countm--;
            }
            min.html(parseInt(countm));
            if (parseInt(countm) < 0) {
                J_goods_item.css('display', 'none');
                coupons.css('display', 'none');
                // empty.css('display', 'block');
                clearInterval(timer);
                sec.hide();
                min.hide();
                $.cookie('cookieid', '', -1);
                $.cookie('cookienum', '', -1);
            }
            if (countdown === 0) {
                return countdown = 60;
            }
        }, 1000);
    }

    //3.计算总价
    function sumprice() {
        var sump = 0; //总价的初始值
        var cunt = 0; //总数量的初始值
        $('.J_goods_item:visible').each(function(i, elm) {
            console.log(i);
            console.log(elm);
            cunt += parseInt($(elm).find('.J_cart_num').val());
            sump += parseInt($(elm).find('.subtotal-price .u-price').html());
        });
        $('.J_info_numTotal').html(cunt);
        $('.c-price-panel-price .J_info_goodsTotal').html(sump);
        $('.J_info_total').html(sump);
    }

    //4.数量加减 
    $('.amount-trigger-plus').on('click', function() {
        let $num = $(this).parents('.J_goods_item').find('.J_cart_num').val();
        $num++;
        $(this).parents('.J_goods_item').find('.J_cart_num').val($num);
        $(this).parents('.J_goods_item').find('.subtotal-price .u-price').html(singplu($(this))); //改变数量后的价格
        sumprice();
        $(this).parents('.J_goods_item').find('.m-amount .amount-trigger-minus').removeClass('z-amount-trigger-disabled');
    });


    $('.amount-trigger-minus').on('click', function() {
        let $num = $(this).parents('.J_goods_item').find('.J_cart_num').val();
        $num--;
        if ($num <= 1) {
            $num = 1;
            $(this).parents('.J_goods_item').find('.m-amount .amount-trigger-minus').addClass('z-amount-trigger-disabled');
        }
        $(this).parents('.J_goods_item').find('.J_cart_num').val($num);
        $(this).parents('.J_goods_item').find('.subtotal-price .u-price').html(singplu($(this))); //改变数量后的价格
        sumprice();

    });

    //5.计算改变数量后单个商品总价
    function singplu(elm) {
        let $spri = parseFloat(elm.parents('.J_goods_item').find('.m-price .u-price').html()); //单价
        let $snum = parseInt(elm.parents('.J_goods_item').find('.J_cart_num').val()); //数量
        return ($spri * $snum).toFixed(2);
    }
    //6.将改变后的数量的值存放到cookie
    //点击按钮将商品的数量和id存放cookie中


    //点击删除 进行删除 删除id对应的cookie数据和页面渲染数
    // function delproductlist(sid, arrid) {
    //     var $index = -1;
    //     $.each(arrid, function(index, element) {
    //         if (sid === index) {
    //             $index = index;
    //         }
    //     })
    // }
    // delproductlist();
    // $('.c-order-button-del').on('click', function() {
    //     $('.product-pic img').attr('picid', )
    // });


    //加载底部内容
    $('.footer').load('footer.html');

}();