/*!
 * jQuery cxCalendar
 * @name jquery.cxcalendar.js
 * @version 1.5.3
 * @date 2016-08-04
 * @author ciaoca
 * @email ciaoca@gmail.com
 * @site https://github.com/ciaoca/cxCalendar
 * @license Released under the MIT license
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  };
}(function($) {
  $.cxCalendar = function() {
    var calendar = {
      dom: {},
      api: {}
    };

    calendar.init = function() {
      var self = this;
      var _settings;
      var _callback;

      // 检测是否为 DOM 元素
      var _isElement = function(o) {
        if(o && (typeof HTMLElement === 'function' || typeof HTMLElement === 'object') && o instanceof HTMLElement) {
          return true;
        } else {
          return (o && o.nodeType && o.nodeType === 1) ? true : false;
        };
      };

      // 检测是否为 jQuery 对象
      var _isJquery = function(o) {
        return (o && o.length && (typeof jQuery === 'function' || typeof jQuery === 'object') && o instanceof jQuery) ? true : false;
      };

      // 分配参数
      for (var i = 0, l = arguments.length; i < l; i++) {
        if (_isJquery(arguments[i])) {
          self.dom.el = arguments[i];
        } else if (_isElement(arguments[i])) {
          self.dom.el = $(arguments[i]);
        } else if (typeof arguments[i] === 'function') {
          _callback = arguments[i];
        } else if (typeof arguments[i] === 'object') {
          _settings = arguments[i];
        };
      };

      if (!self.dom.el.length) {return};

      self.settings = $.extend({}, $.cxCalendar.defaults, _settings, {
        startDate: self.dom.el.data('startDate'),
        endDate: self.dom.el.data('endDate'),
        type: self.dom.el.data('type'),
        format: self.dom.el.data('format'),
        wday: self.dom.el.data('wday'),
        position: self.dom.el.data('position'),
        baseClass: self.dom.el.data('baseClass'),
        language: self.dom.el.data('language')
      });

      self.isIE = !!window.ActiveXObject || document.documentMode;
      self.isIE6 = document.all && !window.XMLHttpRequest;
      self.isFF = !!window.sidebar;

      self.reg = {
        isYear: /^\d{4}$/,
        isMonthOrDay: /^\d{1,2}$/
      };

      self.setOptions();
      self.build(true);

      self.api = {
        show: function() {
          self.show();
        },
        hide: function() {
          self.hide();
        },
        getDate: function() {
          return self.getDate.apply(self, arguments);
        },
        setDate: function() {
          self.setDate.apply(self, arguments);
        },
        gotoDate: function() {
          self.gotoDate.apply(self, arguments);
        },
        clearDate: function() {
          self.clearDate();
        },
        setOptions: function() {
          self.setOptions.apply(self, arguments);
          self.build();
        }
      };

      if (typeof _callback === 'function') {
        _callback(self.api);
      };
    };

    // 获取语言配置
    calendar.getLanguage = function(name) {
      if (typeof name === 'object') {
        return name;
      };

      if (typeof name !== 'string') {
        if (typeof navigator.language === 'string') {
          name = navigator.language;
        } else if (typeof navigator.browserLanguage === 'string') {
          name = navigator.browserLanguage;
        };
      };

      if (typeof name === 'string') {
        name = name.toLowerCase();
      };

      if (typeof name === 'string' && typeof $.cxCalendar.languages[name] === 'object') {
        return $.cxCalendar.languages[name];
      } else {
        return $.cxCalendar.languages['default'];
      };
    };

    // 配置参数
    calendar.setOptions = function(opts) {
      var self = this;
      var _minDate;
      var _maxDate;
      var _defDate;

      if (typeof opts === 'object') {
        $.extend(self.settings, opts);
      };

      if (self.dom.el.val().length) {
        self.settings.date = self.dom.el.val();
      };

      // 缓存日期
      self.cacheDay = self.formatDate('YYYY-M-D', self.settings.date);

      // 最早、最晚日期
      if (self.reg.isYear.test(self.settings.startDate)) {
        _minDate = new Date(self.settings.startDate, 0, 1);
      } else {
        _minDate = new Date(self.getDateValue(self.settings.startDate));
      };

      if (self.reg.isYear.test(self.settings.endDate)) {
        _maxDate = new Date(self.settings.endDate, 11, 31);
      } else {
        _maxDate = new Date(self.getDateValue(self.settings.endDate));
      };

      if (isNaN(_minDate.getTime()) || isNaN(_maxDate.getTime()) || _minDate.getFullYear() > _maxDate.getFullYear()) {
        _minDate = new Date($.cxCalendar.defaults.startDate, 0, 1);
        _maxDate = new Date($.cxCalendar.defaults.endDate, 11, 31);
      };

      self.minDate = {
        year: _minDate.getFullYear(),
        month: _minDate.getMonth() + 1,
        hour: _minDate.getHours(),
        mint: _minDate.getMinutes(),
        secs: _minDate.getSeconds(),
        time: _minDate.getTime()
      };
      self.maxDate = {
        year: _maxDate.getFullYear(),
        month: _maxDate.getMonth() + 1,
        hour: _maxDate.getHours(),
        mint: _maxDate.getMinutes(),
        secs: _maxDate.getSeconds(),
        time: _maxDate.getTime()
      };

      // 默认日期
      if (!self.settings.date) {
        _defDate = new Date();
      } else {
        _defDate = new Date(self.getDateValue(self.settings.date));
      };

      if (isNaN(_defDate.getTime())) {
        _defDate = new Date();
      };

      if (_defDate.getTime() < self.minDate.time) {
        self.defDate = $.extend({}, self.minDate);
      } else if (_defDate.getTime() > self.maxDate.time) {
        self.defDate = $.extend({}, self.maxDate);
      } else {
        self.defDate = {
          year: _defDate.getFullYear(),
          month: _defDate.getMonth() + 1,
          hour: _defDate.getHours(),
          mint: _defDate.getMinutes(),
          secs: _defDate.getSeconds(),
          time: _defDate.getTime()
        };
      };

      // 周末的位置
      self.settings.saturday = 6 - self.settings.wday;
      self.settings.sunday = (7 - self.settings.wday >= 7) ? 0 : (7 - self.settings.wday);

      // 语言配置
      self.language = self.getLanguage(self.settings.language);

      // 统计节假日
      if ($.isArray(self.language.holiday) && self.language.holiday.length) {
        self.holiday = {};
        for (var i = 0, l = self.language.holiday.length; i < l; i++) {
          self.holiday[self.language.holiday[i].day] = self.language.holiday[i].name;
        };
      } else {
        self.holiday = null;
      };
    };

    // 获取当年每月的天数
    calendar.getMonthDays = function(year) {
      var leapYearDay = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 1 : 0;

      return [31, 28 + leapYearDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };

    // 转换日期值类型
    calendar.getDateValue = function(value) {
      var self = this;

      if (self.reg.isYear.test(value)) {
        value = value + '/1/1';
      } else if (typeof value === 'number' && isFinite(value)) {
        value = parseInt(value, 10);
      } else if (typeof value === 'string') {
        value = value.replace(/[\.\-]/g, '/');
      };

      return value;
    };

    // 转换时间值
    calendar.getTimeValue = function(value, type) {
      value = parseInt(value, 10);

      var _min = 0;
      var _max = 59;

      if (type === 'hour') {
        _max = 23;
      };

      if (isNaN(value)) {
        value = _min;
      } else if (value < _min) {
        value = _max;
      } else if (value > _max) {
        value = _min;
      };

      return value < 10 ? '0' + value : value;
    };

    // 格式化日期值
    calendar.formatDate = function(style, time) {
      if (typeof style !== 'string' || time === 'undefined') {
        return time;
      };

      time = this.getDateValue(time);

      var date = new Date(time);
      var attr = {};

      if (isNaN(date.getTime())) {
        return time;
      };

      attr.YYYY = date.getFullYear();
      attr.YY = attr.YYYY.toString(10).slice(-2);
      attr.M = date.getMonth() + 1;
      attr.MM = (attr.M < 10) ? '0' + attr.M : attr.M;
      attr.D = date.getDate();
      attr.DD = (attr.D < 10) ? '0' + attr.D : attr.D;

      attr.H = date.getHours();
      attr.HH = (attr.H < 10) ? '0' + attr.H : attr.H;
      attr.h = (attr.H > 12) ? attr.H-12 : attr.H;
      attr.hh = (attr.h < 10) ? '0' + attr.h : attr.h;
      attr.m = date.getMinutes();
      attr.mm = (attr.m < 10) ? '0' + attr.m : attr.m;
      attr.s = date.getSeconds();
      attr.ss = (attr.s < 10) ? '0' + attr.s : attr.s;

      attr.time = date.getTime();
      attr.string = date.toDateString();

      style = style.replace(/TIME/g, attr.time);
      style = style.replace(/YYYY/g, attr.YYYY);
      style = style.replace(/YY/g, attr.YY);
      style = style.replace(/MM/g, attr.MM);
      style = style.replace(/M/g, attr.M);
      style = style.replace(/DD/g, attr.DD);
      style = style.replace(/D/g, attr.D);
      style = style.replace(/HH/g, attr.HH);
      style = style.replace(/H/g, attr.H);
      style = style.replace(/hh/g, attr.hh);
      style = style.replace(/h/g, attr.h);
      style = style.replace(/mm/g, attr.mm);
      style = style.replace(/m/g, attr.m);
      style = style.replace(/ss/g, attr.ss);
      style = style.replace(/s/g, attr.s);
      style = style.replace(/STRING/g, attr.string);

      return style;
    };

    // 创建面板
    calendar.build = function(isFirst) {
      var self = this;
      var _html;

      if (isFirst === true) {
        self.dom.pane = $('<div></div>', {'class': 'cxcalendar'});
        self.dom.paneHd = $('<div></div>', {'class': 'cxcalendar_hd'}).appendTo(self.dom.pane).html('<a class="prev" href="javascript://" rel="prev"></a><a class="next" href="javascript://" rel="next"></a>');
        self.dom.paneBd = $('<div></div>', {'class': 'cxcalendar_bd'}).appendTo(self.dom.pane);
        self.dom.paneFt = $('<div></div>', {'class': 'cxcalendar_ft'}).appendTo(self.dom.pane);

        self.dom.dateTxt = $('<div></div>', {'class': 'intxt'}).appendTo(self.dom.paneHd);
        self.dom.dateSet = $('<div></div>', {'class': 'inset'}).appendTo(self.dom.paneHd);

        self.dom.yearSet = $('<select></select>', {'class': 'year'}).appendTo(self.dom.dateSet);
        self.dom.monthSet = $('<select></select>', {'class': 'month'}).appendTo(self.dom.dateSet);

        self.dom.weekSet = $('<ul></ul>', {'class': 'week'}).appendTo(self.dom.paneBd);
        self.dom.daySet = $('<ul></ul>', {'class': 'days'}).appendTo(self.dom.paneBd);

        self.dom.dayTxt = $('<div></div>', {'class': 'inday'}).appendTo(self.dom.paneFt);
        self.dom.timeSet = $('<div></div>', {'class': 'intime'}).appendTo(self.dom.paneFt);

        self.dom.hourSet = $('<input/>', {
          'type': 'text',
          'class': 'hour',
          'maxlength': '2'
        }).html(_html).appendTo(self.dom.timeSet);
        self.dom.mintSet = $('<input/>', {
          'type': 'text',
          'class': 'mint',
          'maxlength': '2'
        }).html(_html).appendTo(self.dom.timeSet).before('<i>:</i>');
        self.dom.secsSet = $('<input/>', {
          'type': 'text',
          'class': 'secs',
          'maxlength': '2'
        }).html(_html).appendTo(self.dom.timeSet).before('<i>:</i>');

        self.dom.paneFt.append('<a class="confirm" href="javascript://" rel="confirm"></a>');
      };

      if (self.settings.type !== 'datetime') {
        self.dom.paneFt.hide();
      } else {
        self.dom.paneFt.show();
      };

      // 年份选择框
      _html = '';
      for (var i = self.minDate.year; i <= self.maxDate.year; i++) {
        _html += '<option value="' + i + '">' + i + '</option>';
      };
      self.dom.yearSet.html(_html).val(self.defDate.year);

      // 月份选择框
      _html = '';
      for (var i = 0; i < 12; i++) {
        _html += '<option value="' + (i + 1) + '">' + self.language.monthList[i] + '</option>';
      };
      self.dom.monthSet.html(_html).val(self.defDate.month);

      self.dom.hourSet.val(self.getTimeValue(self.defDate.hour, 'hour'));
      self.dom.mintSet.val(self.getTimeValue(self.defDate.mint, 'mint'));
      self.dom.secsSet.val(self.getTimeValue(self.defDate.secs, 'secs'));

      // 星期排序
      _html = '';
      for(var i = 0; i < 7; i++) {
        _html += '<li'

        // 高亮周末
        if (i === self.settings.saturday) {
          _html += ' class="sat"';
        } else if(i === self.settings.sunday) {
          _html += ' class="sun"';
        };

        _html += '>';
        _html += (i + self.settings.wday < 7) ? self.language.weekList[i + self.settings.wday] : self.language.weekList[i + self.settings.wday - 7];
        _html += '</li>';
      };
      self.dom.weekSet.html(_html);

      // 基础样式
      if (typeof self.settings.baseClass === 'string') {
        self.dom.pane.attr('class', 'cxcalendar').addClass(self.settings.baseClass);
      };

      self.gotoDate(self.defDate.year, self.defDate.month);

      if (isFirst === true) {
        // 面板及背景遮挡层插入到页面中
        self.dom.pane.appendTo('body');
        self.dom.blockBg = $('<div></div>', {'class': 'cxcalendar_lock'}).appendTo('body');

        self.bindEvents();
      };
    };

    // 绑定事件
    calendar.bindEvents = function() {
      var self = this;

      // 显示面板
      self.dom.el.on('focus', function() {
        self.show();
      });

      // 关闭面板
      self.dom.blockBg.on('click', function() {
        self.hide();
      });

      // 显示年月选择
      self.dom.dateTxt.on('click', function() {
        self.dom.dateTxt.hide();
        self.dom.dateSet.show();
      });

      self.dom.pane.on('click', 'a', function(event) {
        switch (this.rel) {
          case 'prev':
            event.preventDefault();
            self.gotoDate(self.dom.yearSet.val(), parseInt(self.dom.monthSet.val(), 10) - 1);
            break;

          case 'next':
            event.preventDefault();
            self.gotoDate(self.dom.yearSet.val(), parseInt(self.dom.monthSet.val(), 10) + 1);
            break;

          // case 'backtoday':
          //   var _now = new Date();
          //   self.gotoDate(_now.getFullYear(), _now.getMonth() + 1);
          //   return false;
          //   break;

          case 'confirm':
            event.preventDefault();
            if (typeof self.cacheDay === 'string' && self.cacheDay.length) {
              self.setDate(self.cacheDay + ' ' + [self.dom.hourSet.val(), self.dom.mintSet.val(), self.dom.secsSet.val()].join(':'));
            };
            break;

          // not undefined
        };
      });

      // 选择年月
      self.dom.pane.on('change', 'select', function() {
        var _name = this.getAttribute('class') || this.getAttribute('classname');

        if (_name === 'year' || _name === 'month') {
          self.gotoDate(self.dom.yearSet.val(), self.dom.monthSet.val());
        };
      });

      // 选择日期
      self.dom.daySet.on('click', 'li', function() {
        var _li = $(this);

        if (_li.hasClass('del')) {return};

        _li.addClass('selected').siblings('li').removeClass('selected');

        self.cacheDay = [_li.data('year'), _li.data('month'), _li.data('day')].join('-');
        self.dom.dayTxt.html(self.cacheDay);

        if (self.settings.type === 'date') {
          self.setDate(_li.data('year'), _li.data('month'), _li.data('day'));
        };

      });

      // 返回到选择的日期
      self.dom.dayTxt.on('click', function() {
        self.gotoDate(self.getDateValue(this.innerHTML));
      });

      // 设置时间
      self.dom.pane.on('mouseup', 'input', function() {
        var _name = this.getAttribute('class') || this.getAttribute('classname');

        if (_name === 'hour' || _name === 'mint' || _name === 'secs') {
          this.select();
        };
      });

      var _mouseEventName = self.isFF ? 'DOMMouseScroll' : 'mousewheel';

      self.dom.pane.on(_mouseEventName, 'input', function(event) {
        event.preventDefault();

        var _name = this.getAttribute('class') || this.getAttribute('classname');
        var _value = parseInt(this.value, 10);
        var _dis = self.isFF ? -(event.originalEvent.detail) : event.originalEvent.wheelDelta;

        if (_name === 'hour' || _name === 'mint' || _name === 'secs') {
          if (_dis > 0) {
            _value += 1;
          } else if (_dis < 0) {
            _value -= 1;
          };

          _value = self.getTimeValue(_value, _name);
          this.value = _value;
        };
      });

      self.dom.pane.on('keydown', 'input', function(event) {
        var _name = this.getAttribute('class') || this.getAttribute('classname');
        var _value = parseInt(this.value, 10);

        if (_name === 'hour' || _name === 'mint' || _name === 'secs') {
          if (event.keyCode === 38 || event.keyCode === 40) {
            if (event.keyCode === 38) {
              _value += event.shiftKey ? 10 : 1;
            } else {
              _value -= event.shiftKey ? 10 : 1;
            };

            _value = self.getTimeValue(_value, _name);
            this.value = _value;
          };
        };
      });

      self.dom.pane.on('blur', 'input', function(event) {
        var _name = this.getAttribute('class') || this.getAttribute('classname');
        var _value = parseInt(this.value, 10);

        if (_name === 'hour' || _name === 'mint' || _name === 'secs') {
          _value = self.getTimeValue(_value, _name);
          this.value = _value;
        };
      });
    };

    // 重新构建月份选项
    calendar.rebulidMonthSelect = function(n, m) {
      var _start = n || 1;
      var _end = m || 12;
      var _html = '';

      for (var i = _start; i <= _end; i++) {
        _html += '<option value="' + i + '">' + this.language.monthList[i - 1] + '</option>';
      };

      this.dom.monthSet.html(_html);
    };

    // 显示日期选择器
    calendar.show = function() {
      var self = this;
      var _position = self.settings.position;
      var _winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var _winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      var _paneWidth = self.dom.pane.outerWidth();
      var _paneHeight = self.dom.pane.outerHeight();
      var _clientTop = self.dom.el[0].getBoundingClientRect().top;
      var _clientLeft = self.dom.el[0].getBoundingClientRect().left;
      var _elTop = self.dom.el.offset().top;
      var _elLeft = self.dom.el.offset().left;
      var _elWidth = self.dom.el.outerWidth();
      var _elHeight = self.dom.el.outerHeight();

      var _paneTop = ((_clientTop + _elHeight + _paneHeight) > _winHeight) ? _elTop - _paneHeight : _elTop + _elHeight;
      var _paneLeft = ((_clientLeft + _paneWidth) > _winWidth) ? _elLeft - _paneWidth - _elWidth : _elLeft;

      if (typeof _position === 'string' && _position.length) {
        switch(_position) {
          case 'top':
            _paneTop = _elTop - _paneHeight;
            break

          case 'topLeft':
          case 'topRight':
            _paneTop = _elTop - _paneHeight;
            _paneLeft = (_position === 'topLeft') ? _elLeft - _paneWidth + _elWidth : _elLeft;
            break

          case 'bottom':
            _paneTop = _elTop + _elHeight;
            break

          case 'bottomLeft':
          case 'bottomRight':
            _paneTop = _elTop + _elHeight;
            _paneLeft = (_position === 'bottomLeft') ? _elLeft - _paneWidth + _elWidth : _elLeft;
            break

          case 'left':
          case 'right':
            _paneTop = ((_clientTop + _elHeight + _paneHeight) > _winHeight) ? _elTop + _elHeight - _paneHeight : _elTop;
            _paneLeft = (_position === 'left') ? _elLeft - _paneWidth : _elLeft + _elWidth;
            break

          case 'leftTop':
          case 'leftBottom':
            _paneTop = (_position === 'leftTop') ? _elTop + _elHeight - _paneHeight : _elTop;
            _paneLeft = _elLeft - _paneWidth;
            break

          case 'rightTop':
          case 'rightBottom':
            _paneTop = (_position === 'rightTop') ? _elTop + _elHeight - _paneHeight : _elTop;
            _paneLeft = _elLeft + _elWidth;
            break

          // not default
        };
      };

      // 防止浏览器刷新缓存文字内容
      self.dom.dateTxt.html('<span class="y">' + self.dom.yearSet.val() + '</span><span class="m">' + self.language.monthList[parseInt(self.dom.monthSet.val(), 10) - 1] + '</span>');
      self.dom.pane.css({
        'top': _paneTop,
        'left': _paneLeft
      }).show();

      if (self.isIE6) {
        self.dom.blockBg.css({
          width: _winWidth,
          height: _winHeight
        });
      };

      self.dom.blockBg.show();
    };

    // 隐藏日期选择器
    calendar.hide = function() {
      var self = this;
      self.dom.pane.hide();
      self.dom.blockBg.hide();
      self.dom.dateSet.hide();
      self.dom.dateTxt.show();
    };

    // 跳转到日期
    calendar.gotoDate = function(year, month) {
      var self = this;
      var _theDate;
      var _theYear;
      var _theMonth;

      if (self.reg.isYear.test(year) && self.reg.isMonthOrDay.test(month)) {
        _theDate = new Date(year, month - 1, 1);
      } else {
        _theDate = new Date(self.getDateValue(year));
      };

      if (isNaN(_theDate.getTime())) {return};

      _theYear = _theDate.getFullYear();
      _theMonth = _theDate.getMonth() + 1;
      _theTime = _theDate.getTime();

      if (_theYear < self.minDate.year || (_theYear <= self.minDate.year && _theMonth < self.minDate.month)) {
        _theYear = self.minDate.year;
        _theMonth = self.minDate.month;
      } else if (_theYear > self.maxDate.year || (_theYear >= self.maxDate.year && _theMonth > self.maxDate.month)) {
        _theYear = self.maxDate.year;
        _theMonth = self.maxDate.month;
      };

      if (_theYear === self.minDate.year && _theYear === self.maxDate.year) {
        self.rebulidMonthSelect(self.minDate.month, self.maxDate.month);
      } else if (_theYear === self.minDate.year) {
        self.rebulidMonthSelect(self.minDate.month, 12);
      } else if (_theYear === self.maxDate.year) {
        self.rebulidMonthSelect(1, self.maxDate.month);
      } else {
        self.rebulidMonthSelect();
      };

      var _jsMonth = _theMonth - 1;
      var _monthDays = self.getMonthDays(_theYear);
      var _sameMonthDate = new Date(_theYear, _jsMonth, 1);
      var _nextMonthDate = new Date(_theYear, _theMonth, 1);
      var _nowDate = new Date();
      var _nowYear = _nowDate.getFullYear();
      var _nowMonth = _nowDate.getMonth() + 1;
      var _nowDay = _nowDate.getDate();
      var _valDate;
      var _valYear;
      var _valMonth;
      var _valDay;

      if (typeof self.cacheDay === 'string' && self.cacheDay.length) {
        _valDate = new Date(self.getDateValue(self.cacheDay));

        if (!isNaN(_valDate.getTime())) {
          _valYear = _valDate.getFullYear();
          _valMonth = _valDate.getMonth() + 1;
          _valDay = _valDate.getDate();
        };
      };

      // 获取当月第一天
      var _firstDay = _sameMonthDate.getDay() - self.settings.wday;
      if (_firstDay < 0) {
        _firstDay += 7;
      };
      var _dayMax = Math.ceil((_monthDays[_jsMonth] + _firstDay) / 7) * 7;

      var _todayNum;
      var _todayYear;
      var _todayMonth;
      var _todayTime;
      var _class;
      var _title;
      var _html = '';

      for (var i = 0; i < _dayMax; i++) {
        _title = '';
        _class = [];
        _todayYear = _theYear;
        _todayMonth = _theMonth;
        _todayNum = i - _firstDay + 1;
        
        // 填充上月和下月的日期
        if (_todayNum <= 0) {
          _class.push('other');

          if (_todayMonth <= 1) {
            _todayYear--;
            _todayMonth = 12;
            _todayNum = _monthDays[11] + _todayNum;
          } else {
            _todayMonth--;
            _todayNum = _monthDays[_jsMonth - 1] + _todayNum;
          };

        } else if (_todayNum > _monthDays[_jsMonth]) {
          _class.push('other');

          if (_todayMonth >= 12) {
            _todayYear++;
            _todayMonth = 1;
            _todayNum = _todayNum - _monthDays[0];
          } else {
            _todayMonth++;
            _todayNum -= _monthDays[_jsMonth];
          };
        };

        _todayTime = new Date(_todayYear, _todayMonth - 1, _todayNum).getTime();

        // 高亮选中日期、今天
        if (typeof _valDate === 'object' && _todayYear === _valYear && _todayMonth === _valMonth && _todayNum === _valDay) {
          _class.push('selected');
        } else if (_todayYear === _nowYear && _todayMonth === _nowMonth && _todayNum === _nowDay) {
          _class.push('now');
        };

        // 高亮周末
        if (i % 7 ===self.settings.saturday) {
          _class.push('sat');
        } else if (i % 7 === self.settings.sunday) {
          _class.push('sun');
        };
        
        // 超出范围的无效日期
        if (_todayTime < self.minDate.time || _todayTime > self.maxDate.time) {
          _class.push('del');
        };

        _title = _todayYear + '-' + _todayMonth + '-' + _todayNum;

        // 判断是否有节假日
        if (self.holiday) {
          if (typeof self.holiday['M' + _todayMonth + '-' + _todayNum] === 'string') {
            _class.push('holiday');
            _title = self.holiday['M' + _todayMonth + '-' + _todayNum];
          } else if (typeof self.holiday['D' + _todayYear + '-' + _todayMonth + '-' + _todayNum] === 'string') {
            _class.push('holiday');
            _title = self.holiday['D' + _todayYear + '-' + _todayMonth + '-' + _todayNum];
          };
        };

        _html += '<li';
        if (_class.length) {
          _html += ' class="' + _class.join(' ') + '"';
        };
        _html += ' title="' + _title + '"';
        _html += ' data-year="' + _todayYear + '" data-month="' + _todayMonth + '" data-day="' + _todayNum + '">' + _todayNum + '</li>';
      };

      self.dom.daySet.html(_html);
      self.dom.dateTxt.html('<span class="y">' + _theYear + '</span><span class="m">' + self.language.monthList[_jsMonth] + '</span>');
      self.dom.yearSet.val(_theYear);
      self.dom.monthSet.val(_theMonth);
    };

    // 获取当前选中日期
    calendar.getDate = function(style) {
      var _value = this.dom.el.val();

      if (typeof style !== 'string' || !style.length) {
        style = this.settings.format;
      };

      _value = this.formatDate(style, _value);

      return _value;
    };

    // 设置日期
    calendar.setDate = function(year, month, day) {
      var self = this;
      var _theDate;
      var _theYear;
      var _theMonth;
      var _theDay;
      var _theValue;

      if (self.reg.isYear.test(year) && self.reg.isMonthOrDay.test(month) && self.reg.isMonthOrDay.test(day)) {
        _theDate = new Date(year, month - 1, day);
      } else {
        _theDate = new Date(self.getDateValue(year));
      };

      if (isNaN(_theDate.getTime())) {return};

      _theYear = _theDate.getFullYear();
      _theMonth = _theDate.getMonth() + 1;
      _theDay = _theDate.getDate();
      _theTime = _theDate.getTime();

      _theValue = self.formatDate(self.settings.format, _theTime);

      self.cacheDay = [_theYear, _theMonth, _theDay].join('-');

      self.dom.el.val(_theValue).trigger('change');

      self.hide();
      self.gotoDate(_theYear, _theMonth);
    };
    
    // 清除日期
    calendar.clearDate = function() {
      this.dom.el.val('');
      this.hide();
    };

    calendar.init.apply(calendar, arguments);

    return this;
  };

  // 默认值
  $.cxCalendar.defaults = {
    startDate: 1950,        // 开始日期
    endDate: 2030,          // 结束日期
    date: undefined,        // 默认日期
    type: 'date',           // 日期类型
    format: 'YYYY-MM-DD',   // 日期值格式
    wday: 0,                // 星期开始于周几
    position: undefined,    // 面板位置
    baseClass: undefined,   // 基础样式
    language: undefined     // 语言配置
  };

  $.cxCalendar.languages = {
    'default': {
      monthList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      holiday: []
    }
  };

  $.fn.cxCalendar = function(settings, callback) {
    this.each(function(i) {
      $.cxCalendar(this, settings, callback);
    });
    return this;
  };
}));