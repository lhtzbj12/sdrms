/*!
 * @author: lihaitao
 * @webSite: http://blog.csdn.net/lhtzbj12/
 * @opencourse:https://gitee.com/lhtzbj12/bootstrap-table-maintainColSwitch.js
 * @version: v1.0.0
 * @description: 扩展Bootstrap-table插件，通过showColumns显示隐藏列时将设置保存到cookie或者数据库,下次打开时仍保持
 */
(function ($) {
    'use strict';
    $.extend($.fn.bootstrapTable.defaults, {
        maintainColSwitch: false,             //是否保持显示列设置，默认false
    });
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable;
    BootstrapTable.prototype.initTable = function () {
        var that = this;
        _initTable.apply(this, Array.prototype.slice.apply(arguments));
        //默认参数，一开始将Default放到'use strict'后面，经过测试发现，多个表格时，后面设置的Default参数会覆盖前面的
        var Default = {
            initShowColumns: [],          //初始化显示的列，当值为空时才从cookie里取值。主要用于从服务器设置参数时使用
            //默认值在初始化时根据 路径 + 表格id 生成
            cookieKey: window.location.pathname.replace(/\/|\./g, "_") + '_colSwitch_' + that.$el.prop('id')
            ,
            cookieExpires: 7,            //默认的cookie有效期7天
            onSave: function (columns) {  //保存时激发，传参为当前显示列的数组
                return false;
            },
            onLoad: function () {    //加载时激发
                return false;
            }
        }
        //合并参数
        if (that.options.showColumns && that.options.maintainColSwitch) {
            that.options.maintainColSwitch = $.extend(Default, that.options.maintainColSwitch);
        } else {
            return;
        }
        //需要显示的列
        var showCols = [];
        if (that.options.maintainColSwitch.initShowColumns.length > 0) {
            showCols = that.options.maintainColSwitch.initShowColumns;
        } else {
            //从cookie读取设置并加载
            var columns = $.cookie(that.options.maintainColSwitch.cookieKey);
            if (columns) {
                //将字符串转成数组
                showCols = columns.split('|');
            }
        }
        //如果需要显示的列为空，则不进行处理
        if(showCols.length>0) {
            $(that.options.columns[0]).each(function (i, e) {
                //如果是state则不处理
                if (e.field === 'state') {
                    return true;
                }
                //判断当前列参数里的列是否在显示范围里
                var inShow = $(showCols).filter(function (i1, e1) {
                    return e1 === e.field
                });
                e.visible = inShow.length > 0;
            });
            //如果定义了事件，则激发
            if (that.options.maintainColSwitch.onLoad) {
                that.options.maintainColSwitch.onLoad();
            }
        }
        //that.$el表示DOM元素
        that.$el.on('column-switch.bs.table', function (e,field, checked) {
            //console.log('保存参数');
            var opts = $(this).bootstrapTable('getOptions');
            var columns = $(opts.columns[0]).map(function (i, e) {
                return e.visible === true && e.field !== 'state' ? e.field : null
            }).get();
            $.cookie(opts.maintainColSwitch.cookieKey, columns.join('|'), {expires: opts.maintainColSwitch.cookieExpires});
            //如果定义了事件，则激发
            if (opts.maintainColSwitch.onSave) {
                opts.maintainColSwitch.onSave(columns);
            }
        });
        //initToolbar 在 initTable后面，进行columnSwitch初始化，如果只有一列处于勾选时禁用
        that.$el.on('load-success.bs.table', function (e) {
            var $keepOpen = that.$toolbar.find('.keep-open');
            if (showCols.length > 0 && showCols.length <= that.options.minimumCountColumns) {
                $keepOpen.find('input:checked').prop('disabled', true);
            }
        });
    };
})(jQuery);