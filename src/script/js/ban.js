;
$(function() {
    const phpurl = 'http://10.31.158.73:8080/vip/php/';
    const $fbcList = $('.fbc-list');
    const $fbcTriggercon = $('.fbc-trigger-con');
    $.ajax({
        type: 'get',
        url: phpurl + 'ban.php',
        dateType: 'json',

    }).done(function(data) {
        let datas = JSON.parse(data);
        // console.log(datas);
        let $listtemp = '';
        let $contemp = '';
        $.each(datas, function(index, value) {
            // console.log(index);
            // console.log(value);
            $listtemp += ` <li class="fbc-list-item">
                        <a href="http://10.31.158.73:8080/vip/src/details.html?sid=${value.picid}" target="_blank" class="fbc_list_img" alt="">
                            <img src="${value.url}" alt="${value.title}">
                        </a>
                    </li>
                   `;
            $contemp += `<li>${value.title}</li>`;
        })
        $fbcList.append($listtemp);
        $fbcTriggercon.append($contemp);
        $fbcList.children().first().addClass('show');
        $fbcTriggercon.children().first().append("<span>|</span>");
    })


});