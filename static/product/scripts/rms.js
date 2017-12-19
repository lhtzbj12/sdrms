var rms = function () {
    //初始化    
    function init() {
        //console.log("*** rms js *** init");
    }
    //菜单初化
    function pageSidebarInit(options) {
        var url = options.url;
        $.sdpost(url, {}, function (re) {
            if (re.code === 0) {                
                var $pageSidebar = $(options.slideBarBox);
                if ($pageSidebar.length === 0) {
                    console.log("menu box is null");
                    return;
                }
                $pageSidebar.html('');
                var data = re.obj;
                var html = [];
                $(data).filter(function (i, e) {
                    //找出要节点
                    return e.Parent.Id === 0;
                }).each(function (i, e) {
                    //菜单
                    if (e.Rtype === 1) {
                        //递归加载子节点
                        html.push(showSiderBarSon(e, data));
                    } else if (e.Rtype === 0) {
                        //如果是区域，先添加header
                        html.push('<li class="header" > ' + e.Name + ' </li>');
                        //添加区域的子节点  
                        $(data).filter(function (i1, e1) {
                            return e1.Parent.Id === e.Id;
                        }).each(function (i2, e2) {
                            //递归调用，显示子节点
                            html.push(showSiderBarSon(e2, data));
                        });
                    }
                });
                $pageSidebar.html(html.join(''));
                //acitve 将href值与cur对应上的菜单激活
                //console.log(options.cur); 
                var curli = $('li a[href="'+options.cur+'"]',$pageSidebar);
                if(curli.length>0){
                    //激活当前
                    curli.parent().addClass('active');  
                    //所有父ul.treeview-menu显示                
                    curli.parents("ul.treeview-menu").show();
                    //所有父li.treeview展开
                    curli.parents('li.treeview').addClass('menu-open');     
                }      
            } else {
                layer.alert("获取失败", { icon: 2, title: "失败" })
            }
        });
    }    
    function showSiderBarSon(cur, data) {
        var html = [];
        //有子菜单
        if (cur.SonNum > 0) {
            html.push('<li class="treeview">');
            html.push('  <a href="javascript:;">');
            html.push('    <i class="' + getIcon(cur.Icon) + '"></i>');
            html.push('    <span>' + cur.Name + '</span>');
            html.push('    <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>');
            html.push('  </a>');
            html.push('  <ul class="treeview-menu">');
            $(data).filter(function (i, e) {
                return e.Parent.Id === cur.Id;
            }).each(function (i, e) {
                //递归调用，显示子节点
                html.push(showSiderBarSon(e, data));
            });
            html.push('  </ul>')
            html.push('</li>')
        } else {
            if (!cur.LinkUrl || cur.LinkUrl.length === 0) {
                cur.LinkUrl = "javascript:;"
            }
            //无子菜单
            html.push('<li><a href="' + cur.LinkUrl + '"><i class="' + getIcon(cur.Icon) + '"></i><span>' + cur.Name + '</span></a></li>');
        }
        return html.join('');
    }
    function getIcon(icon) {
        if (!icon || icon.length === 0) {
            return "fa fa-circle-o"
        }
        return icon;
    }
    //全选和单选联动
    chkAllSingleInit = function (chkAllSelector, chkSingleSelector) {
        $(chkAllSelector).on('click', function () {
            $(chkSingleSelector + ':enabled').prop('checked', $(this).prop('checked'));
        });
        $(chkSingleSelector).on('click', function () {
            if ($(this).prop('checked') === false) {
                $(chkAllSelector).prop('checked', false);
            } else {
                var totalnum = $(chkSingleSelector + ':enabled').length;
                var checknum = $(chkSingleSelector + ":enabled:checked").length;
                $(chkAllSelector).prop('checked', totalnum === checknum);
            }
        });
        //第一次加载时判断是否全选了
        var totalnum = $(chkSingleSelector + ':enabled').length;
        var checknum = $(chkSingleSelector + ":enabled:checked").length;
        $(chkAllSelector).prop('checked', totalnum === checknum);
    }
    //获取x-editable所需要的参数表,url为更新值时请求服务器地址，validate验证的方式，refreshPk成功后是否根据主键刷新列表
    getEditableParam = function (url, validate, refreshPk) {
        console.log('validate:'+validate);
        console.log('refreshPk'+refreshPk);
        var defaultvalidate = function (value) {
            if ($.trim(value).length === 0) {
                return "必填项";
            }
            if (!/^\d+$/.test(value)) {
                return "必须为正整数，且不大于999999";
            }
        };
        if (validate !== null && typeof (validate) !== 'undefined') {
            defaultvalidate = validate
        }
        return {
            url: url,
            type: 'text',
            onblur: 'cancel', //Action when user clicks outside the container. Can be cancel|submit|ignore.  Setting ignore allows to have several containers open.
            showbuttons: true,
            ajaxOptions: {
                type: 'post',
                dataType: 'json'
            },
            validate: defaultvalidate,
            success: function (response, newValue) {
                if (response.code == 0) {
                    parent.layer.msg(response.msg, { icon: 1, title: '成功' });                   
                    if (refreshPk) {
                        //刷新列表数据
                        refresh(response.obj);
                    }
                    else {
                        refresh();
                    }                    
                } else {
                    return response.msg;
                }
            },
            error: function (response, newValue) {
                if (response.status === 500) {
                    return '系统错误，请刷新后重试';
                } if (response.status === 404) {
                    return '请求失败，请刷新后重试';
                } else {
                    return response.responseText;
                }
            }
        }
    }
    return {
        init: init,
        //页面左侧菜单初始化
        pageSidebarInit: pageSidebarInit,
        //全选 单选初始化
        chkAllSingleInit:chkAllSingleInit,
        //获取Editable插件的参数
        getEditableParam:getEditableParam
    }

}();
jQuery(document).ready(function () {
    rms.init()
});