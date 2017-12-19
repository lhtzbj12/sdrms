/*!*********************************************
 * Copyright (C) Corporation. All rights reserved.
 *
 * Author      :  lihaitao
 * Email        : lhtzbj12@126.com
 * Create Date  : 2017-01-22
 * Description  : 自定义的简化ajax请求扩展,依赖layer插件(一款非常优秀的弹出层插件),默认datatype='json',async=true
 * Version      : V1.0.2
 *
 * Revision History:
 *      Date         Author               Description
 *      2017-11-15   lihaitao               loading无关闭的问题
 *      2017-09-22   lihaitao               将async默认值改成true,同步下load出不来
 *      2017-01-22   lihaitao               将async默认值改成false
 *      2017-01-17   lihaitao               create
 *
***********************************************
调用示例
$.sdpost('/home/index', {'name':'lht'});
$.sdpost('/home/index', {'name':'lht'}, function (re) {
    alert(re.code);
},false,'json');
//传入参数
参数1：请求的地址
参数2：提交的值
参数3：成功时的回调函数
参数4：async的值，默认true
参数5：dataType同ajax里的dataType,默认'josn'
*/
(function ($) {
    $.extend({
        sdpost: function (url, data, success, async, dataType) {
            if (typeof (data) === 'undefined' || data === null) data = {};
            if (typeof (async) === 'undefined' || async === null) async = true;
            if (typeof (dataType) === 'undefined' || dataType === null) dataType = 'json';
            var win = window;
            if(parent){
                win = parent;
            }
            $.ajax({
                url: url,
                data: data,
                type: 'post',
                async: async,
                dataType: dataType,
                beforeSend: function (XHR) {
                    win.layer.load();
                },
                complete: function (XHR, TS) {

                },
                success: function (data) {
                    win.layer.closeAll('loading');
                    if (success) {
                        success(data);
                    }
                },
                error: function (XHR, msg, e) {
                    win.layer.closeAll('loading');
                    if (typeof (XHR.responseText) !== 'undefined') {
                        if (XHR.responseText.indexOf('HttpRequestValidationException') > -1) {
                            win.layer.alert("请求失败：" + '您输入的内容里有潜在危险的字符，例如：“&#” 等', { icon: 2, title: '错误' });
                        } else {
                            win.layer.alert("请求失败：" + XHR.responseText, { icon: 2, title: '错误' });
                        }
                    }
                    else {
                        win.layer.alert("请求失败", { icon: 2, title: '错误' });
                    }
                }
            });
        },
        sdget: function (url, data, success, async, dataType) {
            if (typeof (data) === 'undefined') data = {};
            if (typeof (async) === 'undefined' || async === null) async = true;
            if (typeof (dataType) === 'undefined' || dataType === null) dataType = 'json';
            var win = window;
            if(parent){
                win = parent;
            }
            $.ajax({
                url: url,
                data: data,
                type: 'get',
                async: async,
                dataType: dataType,
                beforeSend: function (XHR) {
                    win.layer.load();
                },
                complete: function (XHR, TS) {
                },
                success: function (data) {
                    win.layer.closeAll('loading');
                    if (success) {
                        success(data);
                    }
                },
                error: function (XHR, msg, e) {
                    win.layer.closeAll('loading');
                    if (typeof (XHR.responseText) !== 'undefined') {
                        if (XHR.responseText.indexOf('HttpRequestValidationException') > -1) {
                            win.layer.alert("请求失败：" + '您输入的内容里有潜在危险的字符，例如：“&#” 等', { icon: 2, title: '错误' });
                        } else {
                            win.layer.alert("请求失败：" + XHR.responseText, { icon: 2, title: '错误' });
                        }
                    }
                    else {
                        win.layer.alert("请求失败", { icon: 2, title: '错误' });
                    }
                }
            });
        }
    });
})(jQuery);