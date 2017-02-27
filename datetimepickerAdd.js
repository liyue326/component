// 时间：
// <div class="input-append date" id="datetimepicker" class="datetimeStart">
//     <input size="16" type="text">
//     <span class="add-on"><i class="icon-th"></i></span>
// </div>
// 至
// <div class="input-append date" id="datetimepicker2" class="datetimeEnd">
//     <input size="16" type="text">
//     <span class="add-on"><i class="icon-th"></i></span>
// </div>
$(function () {
        $('#datetimepicker2').datetimepicker({
            language: 'zh',
            format: 'yyyy-mm-dd',
            autoclose: true,
            minView: 2,
            pickerPosition: 'bottom-left'
        });
        $("#datetimepicker").datetimepicker({
            language: 'zh',
            format: 'yyyy-mm-dd',
            autoclose: true,
            minView: 2,
            pickerPosition: 'bottom-left'
        }).on('changeDate', function (ev) {
            var startime = $('#datetimepicker input').val();//注意布局
            $('#datetimepicker2').datetimepicker('setStartDate', startime);
            $('#datetimepicker').datetimepicker('hide');
        });
    });
    //将结束时间的起始时间设为开始时间的val()