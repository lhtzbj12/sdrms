/*!*********************************************
 * Copyright (C) Corporation. All rights reserved.
 *
 * Author      :  lihaitao
 * Email        : lhtzbj12@126.com
 * Create Date  : 2017-11-15
 * Description  : 自定义的简化ajax请求扩展,依赖layer插件mobile版(一款非常优秀的弹出层插件),默认datatype='json',async=true
 * Version      : V1.0.0
 *
 * Revision History:
 *      Date         Author               Description
 *      2017-11-15   lihaitao               create
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
            var index = null;
            $.ajax({
                url: url,
                data: data,
                type: 'post',
                async: async,
                dataType: dataType,
                beforeSend: function (XHR) {
                    layer.open({
                        type: 2
                        ,content: '加载中',
                        success: function(elem){
                            index = $(elem).attr('index');
                        }
                    });
                },
                complete: function (XHR, TS) {

                },
                success: function (data) {
                    if (success) {
                        success(data);
                    }
                },
                error: function (XHR, msg, e) {
                    if(index){
                        layer.close(index);
                    }
                    if (typeof (XHR.responseText) !== 'undefined') {
                        if (XHR.responseText.indexOf('HttpRequestValidationException') > -1) {
                            layer.open({
                                content: "请求失败：" + '您输入的内容里有潜在危险的字符，例如：“&#” 等'
                                ,btn: '关闭'
                            });
                        } else {
                            layer.open({
                                content: "请求失败：" + XHR.responseText
                                ,btn: '关闭'
                            });
                        }
                    }
                    else {
                        layer.open({
                            content: "请求失败"
                            ,btn: '关闭'
                        });
                    }
                }
            });
        },
        sdget: function (url, data, success, async, dataType) {
            if (typeof (data) === 'undefined') data = {};
            if (typeof (async) === 'undefined' || async === null) async = true;
            if (typeof (dataType) === 'undefined' || dataType === null) dataType = 'json';
            var index = null;
            $.ajax({
                url: url,
                data: data,
                type: 'get',
                async: async,
                dataType: dataType,
                beforeSend: function (XHR) {
                    layer.open({
                        type: 2
                        ,content: '加载中',
                        success: function(elem){
                            index = $(elem).attr('index');
                        }
                    });
                },
                complete: function (XHR, TS) {
                },
                success: function (data) {
                    if(index){
                        layer.close(index);
                    }
                    if (success) {
                        success(data);
                    }
                },
                error: function (XHR, msg, e) {
                    if(index){
                        layer.close(index);
                    }
                    if (typeof (XHR.responseText) !== 'undefined') {
                        if (XHR.responseText.indexOf('HttpRequestValidationException') > -1) {
                            layer.open({
                                content: "请求失败：" + '您输入的内容里有潜在危险的字符，例如：“&#” 等'
                                ,btn: '关闭'
                            });
                        } else {
                            layer.open({
                                content: "请求失败：" + XHR.responseText
                                ,btn: '关闭'
                            });
                        }
                    }
                    else {
                        layer.open({
                            content: "请求失败"
                            ,btn: '关闭'
                        });
                    }
                }
            });
        }
    });
})(jQuery);