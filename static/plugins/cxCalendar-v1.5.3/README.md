# jQuery cxCalendar

cxCalendar 是基于 jQuery 的日期选择器插件。

它灵活自由，你可以自定义外观，日期的范围，返回的格式等。

**版本：**

* jQuery v1.7+
* jQuery cxCalendar v1.5

文档：http://code.ciaoca.com/jquery/cxcalendar/

示例：http://code.ciaoca.com/jquery/cxcalendar/demo/

![Preview](http://code.ciaoca.com/jquery/cxcalendar/preview.png)

## 使用方法

### 载入 CSS 文件

```html
<link rel="stylesheet" href="jquery.cxcalendar.css">
```

### 载入 JavaScript 文件

```html
<script src="jquery.js"></script>
<script src="jquery.cxcalendar.js"></script>
```

### DOM 结构

```html
<input id="element_id" type="text">
```

### 调用 cxCalendar

```javascript
$("#element_id").cxCalendar();
```

### 设置全局默认值

```javascript
// 需在引入 <script src="js/jquery.cxcalendar.js"></script> 之后，调用之前设置
$.cxCalendar.defaults.startDate = 1980;
$.cxCalendar.defaults.language = {
  monthList: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 
  weekList: ['Sun', 'Mon', 'Tur', 'Wed', 'Thu', 'Fri', 'Sat'] 
};
```

## 参数说明

名称|默认值|说明
---|---|---
startDate|1950|起始日期<br>若指定年份，设置值为 4 位数的数字<br>若指定某一天，设置值为字符串或时间戳，该值能被```new Date(value)```处理
endDate|2030|结束日期<br>若指定年份，设置值为 4 位数的数字<br>若指定某一天，设置值为字符串或时间戳，该值能被```new Date(value)```处理
date|undefined|默认日期<br>默认获取当前日期，自定义可使用字符串或时间戳，该值能被```new Date(value)```处理<br>※ input 中的 value 值优先级要高级此值
type|'date'|日期类型 **（v1.5 新增）** <br>'date': 只选择日期<br>'datetime': 选择日期和时间
format|'YYYY-MM-DD'|日期值格式 **（自 v1.5 开始，之前版本的 type 更名为 format）** <br>'YYYY': 年份，完整 4 位数字<br>'YY': 年份，仅末尾 2 位数字<br>'MM': 月份，数字带前导零（01-12）<br>'M': 月份（1-12）<br>'DD': 月份中的第几天，数字带前导零（01-31）<br>'D': 月份中的第几天（1-31）<br>'HH': 小时，24 小时格式，数字带前导零（00-23）<br>'H': 小时，24 小时格式（0-23）<br>'hh': 小时，12 小时格式，数字带前导零（01-12）<br>'h': 小时，12 小时格式（1-12）<br>'mm': 分钟，数字带前导零（00-59）<br>'m': 分钟（0-59）<br>'ss': 分钟，数字带前导零（00-59）<br>'s': 分钟（0-59）<br>'TIME': 时间戳<br>'STRING': 日期的字符串，例：Wed Jul 28 1993
wday|0|星期开始于周几，可设置为：0-6 之间的数字<br>0: 星期日<br>1: 星期一<br>2: 星期二<br>3: 星期三<br>4: 星期四<br>5: 星期五<br>6: 星期六
position|undefined|面板显示的位置详见：[[Demo Position](http://code.ciaoca.com/jquery/cxCalendar/demo/position.html)]
baseClass|undefined|给面板容器增加 class，不会覆盖默认的 class
language|undefined|自定义语言，值类型可是是字符串或对象<br>若为字符串，为语言配置文件中的属性名称（需要载入```jquery.cxcalendar.languages.js```）<br>若为对象，则按照对象所设置的语言

## data 属性参数

名称|说明
---|---
data-start-date|起始日期
data-end-date|结束日期
data-type|日期类型
data-format|日期值格式
data-position|面板显示的位置
data-wday|星期开始于周几
data-language|自定义语言

```html
<input id="element_id" type="text" value="1988-1-31" data-start-date="2000" data-end-date="2015" data-format="YYYY/M/D" data-language="en">
```
※ data 属性设置的参数优先级要高于调用时参数设置的值

## 多语言配置说明

只需载入```jquery.cxcalendar.languages.js```，即可根据用户的语言环境，自动显示对应的语言。

名称|默认值|说明
---|---|---
monthList|['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']|月份的名称
weekList|['日', '一', '二', '三', '四', '五', '六']|星期的名称（从星期日开始排序）
holiday|[]|节假日配置

## API 接口

```javascript
var Api;
$('#element_id').cxCalendar(function(api){
  Api = api;
});
// 或者作为第二个参数传入
$('#element_id').cxCalendar({
  type: 'YYYY/M/D'
}, function(api){
  Api = api;
});
```

名称|说明
---|---
show()|显示面板
hide()|隐藏面板
getDate(style)|获取当前选择的日期（style 格式与参数 format 相同）
setDate(value)|传入一个字符串来设置日期
setDate(year, month, day)|分别传入年、月、日来设置日期
gotoDate(value)|传入一个字符串来调整日期（只是显示面板变化，不会进行设置值）
gotoDate(year, month)|分别传入年、月来调整日期（只是显示面板变化，不会进行设置值）
clearDate()|清除日期值
setOptions(opt)|重新设置参数
