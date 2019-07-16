;
(function($) {
    const phpurl = 'http://10.31.158.73:8080/vip/php/';
    const $username = $('#J_user_name');
    const $phone = $('#J_mobile_phone');
    const $email = $('#J_email');
    const $mobilecode = $('#J_mobile_code');
    const $password = $('#J_mobile_pwd');
    const $conGroup = $('.control-group');
    const $tiptext = $('.u-input-tip .text');
    const $warning = $('.u-input-warning');
    const $success = $('.u-input-success');
    const $submit = $('#J_mobile_reg_button');
    var $usernameval = $username.val();
    var $phoneval = $phone.val();
    var $emailval = $email.val();
    let $flag = true; //判断是否重复提交
    // console.log($('.control-group0').find($success));
    // console.log($username.parents('.control-group'));
    // console.log($phone.parents('.control-group'));
    // console.log($conGroup);
    // console.log($email.parents('.control-group'));

    $username.on('blur', function() {
        var $usernameval = $username.val();
        $.ajax({
            type: "post",
            url: phpurl + "registor.php",
            data: {
                loginName: $usernameval
            },
            dataType: "json",
            success: function(data) {
                if (data) { //返回1 存在用户名 不能注册

                    $('.control-group0').find($success).css({
                        'visibility': 'hidden',
                        'opacity': 0
                    });
                    $('.control-group0').find($tiptext).html('该用户名已存在,请重新输入用户名');
                    $('.control-group0').find($warning).css({
                        'visibility': ' visible',
                        'opacity': 1
                    });
                    $('.control-group0').addClass('z-u-form-item-warning');
                    $flag = false;
                } else { //返回空 不存在用户名
                    $('.control-group0').find($tiptext).html('');
                    $('.control-group0').find($warning).css({
                        'visibility': ' hidden',
                        'opacity': 0
                    });
                    $('.control-group0').removeClass('z-u-form-item-warning');

                    $('.control-group0').find($success).css({
                        'visibility': ' visible',
                        'opacity': 1
                    });
                    $flag = true;
                }
            }

        });


    });
    $submit.on('click', function() {
        if (!$flag) {
            return false;
        }
    });

    $username.on('focus', function() {
        if ($usernameval == '') {
            $('.control-group0').find($tiptext).html('请输入6到20位的用户名，由数字、26个英文字母或者下划线组成');
        }
    });
    $phone.on('focus', function() {
        if ($phoneval == '') {
            $('.control-group1').find($tiptext).html('请输入11位手机号');
        }
    });
    $mobilecode.on('focus', function() {
        $('.control-group3').find($tiptext).html('请输入6位验证码（随机的数字）');

    });
    $password.on('focus', function() {
        $('.control-group4').find($tiptext).html('密码需含两种或以上字符组合，区分大小写');
    });

    //正则验证
    $username.on('keyup', function() {
        // console.log($username.val());
        if ($username.val() !== '') {
            console.log(1);
            let reguser = /^\w{6,20}$/;
            if (!reguser.test($username.val())) { //用户名错误

                $('.control-group0').find($tiptext).html('您输入的用户名有误,请重新输入用户名');
                $('.control-group0').find($warning).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group0').addClass('z-u-form-item-warning');
                $('.control-group0').find($success).css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
            } else { //正确

                $('.control-group0').find($success).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group0').find($tiptext).html('');
                $('.control-group0').find($warning).css({
                    'visibility': ' hidden',
                    'opacity': 0
                });
                $('.control-group0').removeClass('z-u-form-item-warning');
            }
        } else {
            $('.control-group0').find($success).css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $('.control-group0').find($tiptext).html('用户名不能为空，请输入用户名');
            $('.control-group0').find($warning).css({
                'visibility': 'visible',
                'opacity': 1
            });
            $('.control-group0').addClass('z-u-form-item-warning');
        }
    });


    $phone.on('keyup', function() {

        if ($phone.val() !== '') {
            // console.log($phone.val());
            let reguser = /^1[3-9]\d{9}$/;
            if (!reguser.test($phone.val())) { //错误

                $('.control-group1').find($tiptext).html('您输入的手机号有误,请重新输入用户名');
                $('.control-group1').find($warning).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group1').addClass('z-u-form-item-warning');
                $('.control-group1').find($success).css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
            } else { //正确

                $('.control-group1').find($success).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group1').find($tiptext).html('');
                $('.control-group1').find($warning).css({
                    'visibility': ' hidden',
                    'opacity': 0
                });
                $('.control-group1').removeClass('z-u-form-item-warning');
                $('.control-group3').find('.btn-verify-code').removeClass('ui-btn-disable').addClass('ui-btn-secondary');
            }
        } else {
            $('.control-group1').find($success).css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $('.control-group1').find($tiptext).html('手机号不能为空，请输入手机号');
            $('.control-group1').find($warning).css({
                'visibility': 'visible',
                'opacity': 1
            });
            $('.control-group1').addClass('z-u-form-item-warning');
        }
    });

    $email.on('keyup', function() {

        if ($email.val() !== '') {
            // console.log($email.val());
            let reguser = /^\w{6,}@[A-z0-9]{2,}\.[A-z]{2,}\.?[A-z]*$/;
            if (!reguser.test($email.val())) { //错误

                $('.control-group2').find($tiptext).html('您输入的邮箱账号有误,请重新输入邮箱账号');
                $('.control-group2').find($warning).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group2').addClass('z-u-form-item-warning');
                $('.control-group2').find($success).css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
            } else { //正确

                $('.control-group2').find($success).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group2').find($tiptext).html('');
                $('.control-group2').find($warning).css({
                    'visibility': ' hidden',
                    'opacity': 0
                });
                $('.control-group2').removeClass('z-u-form-item-warning');
            }
        } else {
            $('.control-group2').find($success).css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $('.control-group2').find($tiptext).html('邮箱账号不能为空，请输入邮箱账号');
            $('.control-group2').find($warning).css({
                'visibility': 'visible',
                'opacity': 1
            });
            $('.control-group2').addClass('z-u-form-item-warning');
        }
    });
    $password.on('keyup', function() {

        if ($password.val() !== '') {
            // console.log($password.val());
            let reguser = /^\w{6,20}$/;
            if (!reguser.test($password.val())) { //错误
                $('.control-group4').find($tiptext).html('您输入的密码有误,请重新输入密码');
                $('.control-group4').find($warning).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group4').addClass('z-u-form-item-warning');
                $('.control-group4').find($success).css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
            } else { //正确

                $('.control-group4').find($success).css({
                    'visibility': ' visible',
                    'opacity': 1
                });
                $('.control-group4').find($tiptext).html('');
                $('.control-group4').find($warning).css({
                    'visibility': ' hidden',
                    'opacity': 0
                });
                $('.control-group4').removeClass('z-u-form-item-warning');
            }
        } else {
            $('.control-group4').find($success).css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $('.control-group4').find($tiptext).html('密码不能为空，请输入密码');
            $('.control-group4').find($warning).css({
                'visibility': 'visible',
                'opacity': 1
            });
            $('.control-group4').addClass('z-u-form-item-warning');
        }
    });
    $checkpsw.on('keyup', function() {
        if ($checkpsw.val() === $password.val()) {
            $('.control-group5').find($success).css({
                'visibility': ' visible',
                'opacity': 1
            });
            $('.control-group5').find($tiptext).html('');
            $('.control-group5').find($warning).css({
                'visibility': ' hidden',
                'opacity': 0
            });
            $('.control-group5').removeClass('z-u-form-item-warning');
        } else {
            $('.control-group5').find($tiptext).html('两次输入的密码不一致,请确认后再输入密码');
            $('.control-group5').find($warning).css({
                'visibility': ' visible',
                'opacity': 1
            });
            $('.control-group5').addClass('z-u-form-item-warning');
            $('.control-group5').find($success).css({
                'visibility': 'hidden',
                'opacity': 0
            });
        }
    });
    // console.log($('.btn-verify-code'));
    $('.control-group3').on('click', function(ev) {
        console.log(ev.target.className);
        if (ev.target.className == 'ui-btn-medium btn-verify-code ui-btn-secondary') {
            // console.log(1);
            let $code = Math.floor(Math.random() * 10);
            let $code1 = Math.floor(Math.random() * 10);
            let $code2 = Math.floor(Math.random() * 10);
            let $code3 = Math.floor(Math.random() * 10);
            let $code4 = Math.floor(Math.random() * 10);
            let $code5 = Math.floor(Math.random() * 10);

            // console.log(`${$code}${$code}`);
            $mobilecode.val(`${$code}${$code1}${$code2}${$code3}${$code4}${$code5}`);
            if ($mobilecode.val() !== '') {
                // console.log($mobilecode.val());
                let reguser = /^\d{6}$/;
                if (!reguser.test($mobilecode.val())) { //错误

                    $('.control-group3').find($tiptext).html('您输入的手验证码有误,请重新输入验证码');
                    $('.control-group3').find($warning).css({
                        'visibility': ' visible',
                        'opacity': 1
                    });
                    $('.control-group3').addClass('z-u-form-item-warning');
                    $('.control-group3').find($success).css({
                        'visibility': 'hidden',
                        'opacity': 0
                    });
                } else { //正确

                    $('.control-group3').find($success).css({
                        'visibility': ' visible',
                        'opacity': 1
                    });
                    $('.control-group3').find($tiptext).html('');
                    $('.control-group3').find($warning).css({
                        'visibility': ' hidden',
                        'opacity': 0
                    });
                    $('.control-group3').removeClass('z-u-form-item-warning');
                }
            } else {
                $('.control-group3').find($success).css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
                $('.control-group3').find($tiptext).html('验证码不能为空，请输入验证码');
                $('.control-group3').find($warning).css({
                    'visibility': 'visible',
                    'opacity': 1
                });
                $('.control-group3').addClass('z-u-form-item-warning');
            }
        }
    });
})(jQuery);