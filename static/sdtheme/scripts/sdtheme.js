/*!
 * 用于当前主题通过的方法
 * Created by lihaitao on 2017-7-10.
 */
layer.ready(function () {
    layer.config({
        isOutAnim: false,
       /* extend: 'metronic/style.css',
        skin: 'layer-ext-metronic'*/
    });
});

/**
 * Created by lihaitao on 2017-7-11.
 */
var sdtheme = function () {
    showstr = function (str, replace) {
        if (str === null || typeof (str) === "undefined") {
            if (typeof (replace) === 'undefined') {
                return "";
            } else {
                return replace;
            }

        }
        return str;
    }
    showlongstr = function (str, replace) {
        return '<span title="' + str + '">' + showstr(str, replace) + '</span>';
    }
    showenable = function (val) {
        if (val === 1 || val === "1") {
            return '<label class="label label-success label-sm"><i class="fa fa-check"></i> 启用</label>';
        } else if (val === 0 || val === "0") {
            return '<label class="label label-danger label-sm"><i class="fa fa-ban"></i> 禁用</label>';
        } else if (val === -1 || val === "-1")
            return '<label class="label label-info label-sm"><i class="fa fa-trash"></i> 删除</label>';
        else {
            return "";
        }
    }
    showyes = function (val) {
        if (val === 1 || val === "1" || val === true) {
            return '<label class="label label-primary label-sm"><i class="fa fa-check"></i> 是</label>';
        } else if (val === 0 || val === "0" || val === false) {
            return '<label class="label label-danger label-sm"><i class="fa fa-close"></i> 否</label>';
        } else {
            return "";
        }
    }
    showenum = function (value, texts, css, icon) {
        var index = 0, text = "", icss = 'label-default';
        if (css === null || typeof (css) === 'undefined') {
            css = ['label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];
        }
        var item = $(texts).each(function (i, e) {
            if (e.Value === value) {
                index = i;
                text = e.Text;
                return false;
            }
        });
        if (index <= css.length) {
            icss = css[index];
        }
        return '<label class="label ' + icss + '  label-sm">' + text + '</label>';
    }

    //从cookie加载查询条件
    function loadSearchText(formId) {
        var serialize = $.cookie('formmaitain_' + formId);
        if (serialize) {
            serialize = serialize.replace(/\+/g, ' ');
            //整理name 和 值，
            var namevals = {};
            $(serialize.split('&')).each(function (i, e) {
                var keyval = e.split('=');
                if (namevals[keyval[0]] !== undefined) {
                    namevals[keyval[0]] = namevals[keyval[0]] + ',' + keyval[1]; //考虑同一个name多个值的情况
                } else {
                    namevals[keyval[0]] = keyval[1];
                }
            });
            for (var key in namevals) {
                var ctrl = $("#" + formId).find('[name="' + key + '"]');
                if (ctrl.length > 0) {
                    ctrl = ctrl.get(0);
                    if (ctrl.tagName.toLowerCase() == "input") {
                        if (($(ctrl).prop('type') === 'checkbox' || $(ctrl).prop('type') === 'radio') && !$(ctrl).prop('checked')) {
                            $(ctrl).parent().trigger('click');
                        } else {
                            $(ctrl).val(namevals[key]);
                        }
                    } else if (ctrl.tagName.toLowerCase() == "select") {
                        $(ctrl).selectpicker('val', namevals[key].split(',')); //将,拼接的字符转成数组
                    }
                }
            }
        }
    }
    //将查询条件存入cookie
    function saveSearchText(formId) {
        //将查询表单的值存在cookie
        $.cookie('formmaitain_' + formId, decodeURIComponent($("#" + formId).serialize(), true), { expires: 1 });
    }
    //treetable
    function saveExpandStatus(treeGridId) {
        //获取所有展开的节点的id
        var ids = [];
        var $expandeds = $("#" + treeGridId).find('tr.expanded');
        $expandeds.each(function (i, e) {
            ids.push($(e).attr('data-tt-id'));
        });
        $.cookie(treeGridId + '_expandedids', ids.join(','), { expires: 1 });
    }
    //treetable
    function loadExpandStatus(treeGridId) {
        //获取所有展开的节点的id
        var ids = $.cookie(treeGridId + '_expandedids');
        if (ids !== null && typeof ids !== 'undefined' && ids.length > 0) {
            $(ids.split(',')).each(function (i, e) {
                //先判断节点是否存在
                if ($("#" + treeGridId).find('tr[data-tt-id="' + e + '"]').length > 0) {
                    $("#" + treeGridId).treetable('expandNode', e);
                }
            });
        }
    }
    //高亮显示，scrollto是否自动滚动， 传入jquery对象,css
    function highlight(object, scrollto, css) {
        if (object === null || object.length === 0) return;
        var t = 6, scroll = true, hcss = 'highlight';
        if (scrollto !== null && typeof scrollto !== 'undefined') {
            scroll = scrollto
        }
        if (css !== null && typeof css !== 'undefined') {
            hcss = css
        }
        //滚动条自动滚动
        var $win = $(window);
        var $body = $('html,body');
        var troffsettop = object.offset().top;
        if (troffsettop < $win.scrollTop() + object.outerHeight() * 2) {
            $body.stop().animate({ "scrollTop": troffsettop - object.outerHeight() * 2 }, 200);
        }
        if (troffsettop >= $win.scrollTop() + $win.height() - object.outerHeight() * 3) {
            $body.stop().animate({ "scrollTop": troffsettop - $win.height() + object.outerHeight() * 3 }, 200);
        }
        //高亮
        $(object).toggleClass(hcss);
        var spark = function () {
            if (t-- === 0) {
                $(object).removeClass(hcss);
                return;
            }
            $(object).toggleClass(hcss);
            setTimeout(spark, 300);
        }
        spark();
    }
    //初始化搜索条件面板状态保持功能
    function searchPanelStatusInit(btnid) {
        var $btn = $('#' + btnid);
        if ($btn.length > 0) {
            var $icon = $('i',$btn)
            //在点击事件里保存状态到cookie
            $btn.off('click').on('click', function () {
                console.log('click')
                //点击时保存，css会切换
                var css = 'fa-plus';
                if ($icon.hasClass('fa-plus')) {
                    css = 'fa-minus';
                }
                $.cookie('SearchPanelStatus' + btnid, css, { expires: 1 });
            });
            //页面加载时，加载状态
            var css = $.cookie('SearchPanelStatus' + btnid);
            if (css != null && typeof css !== 'undefined') {
                if (css === 'fa-minus') {
                    $icon.removeClass('fa-plus').addClass('fa-minus')
                    $btn.closest('div.box').removeClass('collapsed-box')
                    $btn.closest('div.box-header').next().show()
                }
            }
            //只要面板处于关闭
            if($icon.hasClass('fa-plus')){
                //重点提示更多条件
                layer.tips('显示/隐藏更多查询条件', '#' + btnid, {
                    tips: [1, '#35AA47'],
                    time: 5000,
                    shift: 6
                });
            }
        }
    }
    //将当前滚动条位置保存至cookie,默认会话结束后失效
    function saveScrollTop2Cookie(expire) {
        var exp = null;
        if (expire !== null && typeof expire !== 'undefined') {
            exp = expire;
        }
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 0) {
            $.cookie('page.scrollTop', scrollTop, { expires: exp });
        }
    }
    //从cookie读取滚动条位置，使用一次后失效
    function loadScrollTopFromCookie() {
        var scrollTop = $.cookie('page.scrollTop');
        if (scrollTop != null && typeof scrollTop !== 'undefined' && scrollTop.length > 0 && parseInt(scrollTop) > 0) {
            $(window).scrollTop(parseInt(scrollTop));
            $.cookie('page.scrollTop', '');
        }
    }
    function alertXHRError (XHR, status, e) {
        if (typeof (XHR.responseText) !== 'undefined') {
            parent.layer.alert("请求失败：" + XHR.responseText, { icon: 2, title: '错误' });
        }
        else {
            parent.layer.alert("请求失败", { icon: 2, title: '错误' });
        }
    }
    return {
        //
        init:init,
        //
        uniform:uniform,
        //传入的值为null，则用replace代替，默认为空
        showstr: showstr,
        //使用span将值包裹
        showlongstr: showlongstr,
        //显示启用或者禁用
        showenable: showenable,
        //显示是否
        showyes: showyes,
        //显示枚举
        showenum: showenum,
        //保存form里的查询条件
        saveSearchText: saveSearchText,
        //加载form查询条件
        loadSearchText: loadSearchText,
        //将treetable里展开的节点数据保存到cookie
        saveExpandStatus: saveExpandStatus,
        //从cookie读取treetable展开节点数据，并应用
        loadExpandStatus: loadExpandStatus,
        //高亮显示
        highlight: highlight,
        //初始化搜索条件面板状态保持功能
        searchPanelStatusInit: searchPanelStatusInit,
        //
        saveScrollTop2Cookie: saveScrollTop2Cookie,
        //
        loadScrollTopFromCookie: loadScrollTopFromCookie,
        alertXHRError:alertXHRError
    };
    //控件美化
    function uniform() {
        //使用bootstrap-select的下拉初始化
        $("select.bs-select").selectpicker();
    }
    function init() {
        //控件美化
        uniform();
    }
}();

jQuery(document).ready(function () {
    sdtheme.init()
});