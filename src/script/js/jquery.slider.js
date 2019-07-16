;
(function($) {

    $.fn.extend({

        slider: function() {
            $(this).each(function(index, element) {
                const $bann = $(element).find('.focus-banner-con');
                const $btn = $(element).find('.fbc-trigger-con');
                const $trigLine = $(element).find('.fbc-trigger-line');
                const $piclist = $(element).find('.fbc-list');
                const $left = $(element).find('.fbc-btn-left');
                const $right = $(element).find('.fbc-btn-right');
                let $num = 0;
                let $timer = null;

                //给$btn添加点击事件
                $btn.on('click', function(ev) {
                    var ev = ev || event;
                    var evtarget = ev.target || src.Element;
                    if (evtarget.nodeName === "LI") {
                        $num = $(evtarget).index();
                        tabswitch();

                    }

                });

                //鼠标经过banner图时 ,显示和隐藏左右箭头
                $bann.hover(function() {
                    $left.stop(true).animate({
                        left: 0
                    }, 1)
                    $right.stop(true).animate({
                        right: 0
                    }, 1)
                    clearInterval($timer);
                }, function() {
                    $left.stop(true).animate({
                        left: -33
                    }, 1)
                    $right.stop(true).animate({
                        right: -33
                    }, 1)
                    $timer = setInterval(function() {
                        $right.click();
                    }, 2000);

                });
                $btn.hover(function() {
                    clearInterval($timer);
                }, function() {
                    $timer = setInterval(function() {
                        $right.click();
                    }, 2000);
                });

                //左右箭头添加点击事件
                $right.on('click', function() {
                    $num++
                    if ($num > 1) {
                        $num = 0
                    }
                    tabswitch()
                })
                $left.on('click', function() {
                    $num--
                    if ($num < 0) {
                        $num = 1
                    }
                    tabswitch()
                })

                //自动轮播
                $timer = setInterval(function() {
                    $right.click();
                }, 2000);

                //tab切换
                function tabswitch() {
                    let $w = ($piclist.width() - 195 * 2) / 2 + 195 * $num; //线条移动的位置

                    $piclist.children('li').eq($num).addClass('show').siblings().removeClass('show');
                    $trigLine.stop(true).animate({
                        left: $w
                    });
                }


            });
        }

    });
})(jQuery);