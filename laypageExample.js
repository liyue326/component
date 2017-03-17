$(function () {
    $('#search').click(function () {
        $('#searchonTable').html('');
        search_online();
    })
});
function search_online(curr) {
    var pageSize = 20;
    var total = $('.total');
    var page = curr || 1;
    var telinput = document.getElementById("telval").value;
    var telstr = telinput.replace(/(^\s*)|(\s*$)/g, "");
    if (telstr.length == 0) {
        alert("请输入您要查询的号码");
        return false;
    }
    if (telstr.length < 11) {
        alert("请输入正确的号码");
    }
    var telObj = telstr.split(',');
    //去除全选
    var checkbox = $('#myTabContent div.active .zhishu :checked').not('.all');
    if (checkbox.length == 0) {
        alert("请选择您要查询的指数");
        return false;
    }
    var arr = [];
    var arr1 = [];
    var str = "";

    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            arr1.push(checkbox[i].value);
        }
    }
    $.ajax({
        url: '/getScoreListByIndexName/' + page,
        data: {
            searchkeys: telObj.toString(),
            selectedindex: arr1.toString(),
            page: curr || 1
        },
        type: 'POST',

        //beforeSend:function(){
        //    $("#loading").html("<img src='../static/media/image/select2-spinner.gif' />");
        //},
        success: function (res) {
            $('.result').show();
            var jsondata = JSON.parse(res);
            if (jsondata["res"]["res_code"] == 0) {
                var str = '';
                for (var i = 0; i < jsondata["data"].length; i++) {
                    str += '<tr>';
                    var str1 = '<tr>';
                    var item = jsondata["data"][i];
                    for (var j = 0; j < Object.keys(item).length; j++) {
                        str1 += '<th>' + Object.keys(item)[j] + '</th>';
                        str += '<td class="isp">' + item[Object.keys(item)[j]] + '</td>';

                    }
                    str+='</tr>';
                    str1 += '</tr>';
                }
                var seqid=jsondata["seqid"];
                $('#saveBtn').click(function(){
                    window.location='/download/'+seqid;

                });

                var num1 = telObj.length;
                var num2 = arr1.length;
                var num3 = num1 * num2;
                $('#searchonTable ').html(str);
                $('#searchonTable tbody').before(str1);
                $('#searchonTable tr:first').wrap('<thead></thead>');
                $('.telnum').text(num1);
                $('.zhishunum').text(num3);
                var arrLength = [];
                for (var k = 0; k < $('.isp').length; k++) {
                    if ($('.isp').eq(k).text() == "电信") {
                        $('.isp').eq(k).html('').addClass('dianxin');
                    }
                    if ($('.isp').eq(k).text() == "联通") {
                        $('.isp').eq(k).html('').addClass('liantong');
                    }
                    if ($('.isp').eq(k).text() == "移动") {
                        $('.isp').eq(k).html('').addClass('yidong');
                    }
                    //匹配指数
                    if ($('.isp').eq(k).text() == "-1") {
                        arrLength.push(1);
                        var except = arrLength.length;
                        $('.pipei').text(num3 - except);
                    }
                    //进度条
                    //if ($('.isp').eq(k).text() > 0 && $('.isp').eq(k).text() < 100) {
                    //    $('.isp').eq(k).append('<div class="tiaoxing"></div>');
                    //    $('.tiaoxing').width($('.isp').eq(k).text());
                    //}
                }
                //$("#searchonTable").trigger("update");
                //$("#loading").empty();

            } else {
                console.log(res);
                alert(res["res"]["res_code"]);
                return;
            }
            laypage({
                cont: 'page_ul',
                pages: Math.ceil((jsondata["data"].length) / pageSize),
                curr: curr || 1,
                //first: '首页', //若不显示，设置false即可
                //last: '尾页', //若不显示，设置false即可
                //prev: '<', //若不显示，设置false即可
                //next: '>', //若不显示，设置false即可
                jump: function (obj, first) { //触发分页后的回调
                    if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                        $('#searchonTable').html('');
                        search_online(obj.curr);
                    }
                }
            });

            //$("#loading").empty();

            //在表格加载完成之后进行排序
            $("#searchonTable").tablesorter();
            $("#searchonTable").trigger("update");

        },
        error: function (error) {
            alert(error["res"]["res_code"] + ["res"]["res_message"]);
            //$("#loading").empty();
        }


    })
}
