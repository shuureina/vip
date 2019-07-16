;
(function($) {
    const phpurl = 'http://10.31.158.73:8080/vip/php/';

    const $loginbtn = $('#J_mobile_login_button');
    const $loginName = $('#J_login_name');
    const $password = $('#J_login_pwd');
    const $tiptext = $('.u-input-tip .text');
    const $warning = $('.u-input-warning');
    $loginbtn.on('click', function() {
        $.ajax({
            type: "post",
            url: phpurl + "login.php",
            data: {
                loginName: $loginName.val(),
                password: $password.val()
            },
            dataType: "json",
            success: function(data) {
                console.log(data);
                if (!data) { //不存在 登录失败
                    $('.c-form-error').removeClass('hidden');
                } else { //存在 登录成功
                    $('.c-form-error').addClass('hidden');
                    location.href = "index.html";
                }
            }
        });
    });

    $loginName.on('blur', function() {

        if ($loginName.val() == '') {
            $('.control-group1').find($tiptext).html('登录名不能为空，请输入密码');
            $('.control-group1').find($warning).css({
                'visibility': 'visible',
                'opacity': 1
            });
            $('.control-group1').addClass('z-u-form-item-warning');
        } else {
            $('.control-group1').find($tiptext).html('');
            $('.control-group1').find($warning).css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $('.control-group1').removeClass('z-u-form-item-warning');
        }
    });
    $password.on('blur', function() {
        if ($password.val() == '') {
            $('.control-group2').find($tiptext).html('密码不能为空，请输入密码');
            $('.control-group2').find($warning).css({
                'visibility': 'visible',
                'opacity': 1
            });
            $('.control-group2').addClass('z-u-form-item-warning');
        } else {
            $('.control-group1').find($tiptext).html('');
            $('.control-group1').find($warning).css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $('.control-group1').removeClass('z-u-form-item-warning');
        }
    });

    //记住用户名
    $('#J_mobile_login_button').on('click', function() {
        let jsonObj = JSON.stringify({
            loginName: $loginName.val()
        });
        let savename = escape(jsonObj);
        if ($('#J_remember_username').prop('checked')) {
            $.cookie('username', savename, { expires: 7, path: '' });
        } else {
            $.cookie('username', savename, { expires: -1, path: '' });
        }
    });
    //获取用户名
    console.log(decodeURI(document.cookie).split(','));
    $(function() {
        if (document.cookie) {
            $('#J_remember_username').attr('checked', true);
            let $usernames = decodeURI(document.cookie).split(',');
            for (let i = 0; i < $usernames.length; i++) {
                let $userarr = $usernames[i].split('=');
                console.log($userarr)
                if ($userarr[0] == 'username') {
                    console.log(JSON.parse(unescape($userarr[1])));
                    let $loname = JSON.parse(unescape($userarr[1]));
                    $loginName.val($loname.loginName);
                }
            }
        } else {
            $('#J_remember_username').attr('checked', false);
        }
    });
})(jQuery);;