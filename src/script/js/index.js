;
! function() {
    const phpurl = 'http://10.31.158.73:8080/vip/php/';
    const $SJbItemdata = $('.shop-sort .J-brand-item-data');
    const $CJbItemdata = $('.shop-coming .J-brand-item-data');
    const $indexfloor = $('.J-index-floor');
    const $indexnavitem = $('.index-nav-item');
    const $gototop = $('#J_sbar_top');
    let $fontarr = $(".vipSidebarFont:not('.i-sidebarcom-cart')"); //右侧导航的小图标集合

    //1.给图片添加懒加载
    $(window).on('scroll', function() {
        // let $imgarr = $('.shop-sort .J-brand-item-data').find('img');
        // $.each($imgarr, function(index, element) {
        //     $(element).lazyload({
        //         effect: 'fadeIn'
        //     });
        // })
        $('img').lazyload({
            effect: 'fadeIn'

        });
    });

    //2.从后端获取数据并渲染
    $.ajax({
        url: phpurl + 'index.php',
        dateType: 'json',

    }).done(function(data) {
        let dataarr = JSON.parse(data);
        // console.log(dataarr);
        var $html = '';
        var $htmlS = '';
        var $htmlC = '';

        $.each(dataarr, function(index, value) {
            $html = `
                        <a href="details.html?picid=${value.picid}" class="brand-item-hover" target="_blank">
                            <img data-original="${value.indexurl}" alt="${value.title}" class="lazy">
                            <div class="brand-info"><span class="brand-name" title="${value.title}">${value.title}</span>
                                <div class="brand-discount-pms">
                                    <span class="brand-discount"><span class="dis-num">${value.sell}</span>折起</span>
                                </div>
                            </div>
                        </a>
                  `;
            $htmlS += `<div class="brand-item">` + $html + ` <span class="ui-btn-fav-like" role="button">
            <a class="vipFont"><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucang11
            "></use>
            </svg></a>
            <span class="fav-hidden">收藏品牌</span>
    </span></div>`;
            $htmlC += '<div class="brand-item">' + $html + '<div class="book-notice"></div></div>';
        });


        $SJbItemdata.html($htmlS);
        $CJbItemdata.html($htmlC);
        // console.log($('.shop-sort .J-brand-item-data').find('img'));

    });


    //3.1触发滚动条事件 显示隐藏的楼梯
    $(window).on('scroll', function() {
        let $scrolltop = $(window).scrollTop();
        let $imgtop = $('.index-content-wrp').offset().top;
        let $headerheight = $('#vip-common-header').height();
        if ($scrolltop > $headerheight) { //头部导航条的固定定位
            $('#J_main_nav').addClass('main-nav-be-fixedtrans');
        } else {
            $('#J_main_nav').removeClass('main-nav-be-fixedtrans');
        }
        if ($scrolltop > $imgtop) { //左侧的固定定位
            $('#J-index-nav-sort').addClass('is-lift-nav-fixed');
        } else {
            $('#J-index-nav-sort').removeClass('is-lift-nav-fixed');
        }

        //滚到某个的楼层，给其对应的楼梯添加属性
        $indexfloor.each(function(index, element) {
            // console.log(index);
            // console.log($scrolltop);
            let $floortop = $indexfloor.eq(index).offset().top;
            if ($floortop >= $scrolltop) {
                $indexnavitem.removeClass('curr'); //滚动时所有楼梯去掉curr
                $indexnavitem.eq(index).addClass('curr'); //滚到某个的楼层，给其对应的楼梯添加curr
                return false;
            }
        });

    });

    //3.2给楼梯添加点击事件 点击跳到对应的楼层
    $indexnavitem.on('click', function() {
        $(this).addClass('curr').siblings().removeClass('curr');
        let $floortop = $indexfloor.eq($(this).index()).offset().top; //对应楼层的top值
        //将对应楼层的top值给滚动条 animate
        $('html,body').animate({
            scrollTop: $floortop
        });

    });


    //4.显示和隐藏二级导航

    $('.top-nav-tool>li').not(":first").each(function() {
        $(this).hover(function() {

            $(this).find('div').show();

        }, function() {

            $(this).find('div').hide();

        });
    });

    $('#J_main_nav_category').hover(function() {
        $('.cate-menu').show();
        $('.cate-menu').hover(function() {
            $(this).show();
            // if (ev.target.nodeName === "LI") {
            //     $(ev.target).css('background', 'color');
            // }
        }, function() {
            $(this).hide();
        });
    }, function() {
        $('.cate-menu').hide();


    });



    // 右侧二级导航
    // console.log($fontarr.parent());
    $fontarr.each(function() {

            $(this).hover(function() {
                $(this).parent('div').find('.sidebarcom-hover').css('right', '36px');
                $(this).css({
                    'background-color': '#fff',
                    'color': "#f10180"
                });
                $(this).find('.sidebarcom-my-name').css('color', "#f10180");

            }, function() {
                $(this).parent('div').find('.sidebarcom-hover').css('right', '-120px');
                $(this).css({
                    'background-color': '',
                    'color': ""
                });
                $(this).find('.sidebarcom-my-name').css('color', "");
            });

        })
        //     // https://category.vip.com/ajax/getSuggest.php?callback=searchSuggestions&keyword=a&_=1563249317135
        // function search(data) {
        //     console.log(data);
        // }
        // search();
        // $('.c-search-input').oninput()
        //回到顶部
    $gototop.on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        });
    });
    //加载底部内容
    $(".footer").load("footer.html");

}();