/*!
 * 对daterangepicker简单封装，针对不同的前端框架，默认参数值可能不一样
 * Created by lihaitao on 2019-04-26.
 */
(function ($) {
  $.fn.sddaterangepicker = function(opt, callback) {
    var options = {
      timePicker : true,
      timePicker24Hour: true,
      timePickerSeconds : true,
      allowSame : false, // 不允许相等
      buttonClasses : 'btn btn-sm',
      applyClass : 'btn-primary',
      cancelClass : 'btn-default'      
    };
    options.ranges = {
      '今日': [moment().startOf('day'), moment().endOf('day')],
      '昨日': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
      '最近7日': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
      '最近30日': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
      '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      '当月': [moment().startOf('month'), moment().endOf('month')],
      '下个月': [moment().add(1,'month').startOf('month'), moment().add(1,'month').endOf('month')],
      '往后7日': [ moment().add(1,"days").startOf('day'), moment().add(6, 'days').endOf('day')],
      '往后30日': [ moment().add(1,"days").startOf('day'), moment().add(29, 'days').endOf('day')],
    };
    options.locale = {
      format:"YYYY-MM-DD HH:mm:ss",
      separator: ' - ',
      applyLabel: '确定',
      cancelLabel: '取消',
      fromLabel: '起始时间',
      toLabel: '结束时间',
      customRangeLabel: '自定义',
      //weekLabel: "W",
      daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      firstDay: 1
    };
    options = $.extend(true, options, opt);
    this.daterangepicker(options, function(start, end, label) {
      if(callback){
        callback(start, end, label)
      }
    });
    return this;
  };
})(jQuery);