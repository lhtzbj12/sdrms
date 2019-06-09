package controllers

import (
	"encoding/json"
	"time"

	"github.com/lhtzbj12/sdrms/enums"
	"github.com/lhtzbj12/sdrms/models"
	"github.com/lhtzbj12/sdrms/utils"

	"fmt"
	"strconv"
	"strings"

	"github.com/astaxie/beego/orm"
)

//CourseController 课程管理
type CourseController struct {
	BaseController
}

//Prepare 参考beego官方文档说明
func (c *CourseController) Prepare() {
	//先执行
	c.BaseController.Prepare()
	//如果一个Controller的多数Action都需要权限控制，则将验证放到Prepare
	c.checkAuthor("DataGrid", "DataList", "UpdateSeq", "UploadImage")
	//如果一个Controller的所有Action都需要登录验证，则将验证放到Prepare
	//权限控制里会进行登录验证，因此这里不用再作登录验证
	//c.checkLogin()
}

//Index 角色管理首页
func (c *CourseController) Index() {
	//将页面左边菜单的某项激活
	c.Data["activeSidebarUrl"] = c.URLFor(c.controllerName + "." + c.actionName)
	c.setTpl()
	c.LayoutSections = make(map[string]string)
	c.LayoutSections["headcssjs"] = "course/index_headcssjs.html"
	c.LayoutSections["footerjs"] = "course/index_footerjs.html"
	//页面里按钮权限控制
	c.Data["canEdit"] = c.checkActionAuthor("CourseController", "Edit")
	c.Data["canDelete"] = c.checkActionAuthor("CourseController", "Delete")
}

// DataGrid 课程管理首页 表格获取数据
func (c *CourseController) DataGrid() {
	//直接反序化获取json格式的requestbody里的值
	var params models.CourseQueryParam
	json.Unmarshal(c.Ctx.Input.RequestBody, &params)
	//获取数据列表和总数
	data, total := models.CoursePageList(&params)
	//定义返回的数据结构
	result := make(map[string]interface{})
	result["total"] = total
	result["rows"] = data
	c.Data["json"] = result
	c.ServeJSON()
}

//Edit 添加、编辑课程界面
func (c *CourseController) Edit() {
	if c.Ctx.Request.Method == "POST" {
		c.Save()
	}
	Id, _ := c.GetInt(":id", 0)
	m := models.Course{Id: Id, Seq: 100, StartTime: time.Now(), EndTime: time.Now()}
	if Id > 0 {
		o := orm.NewOrm()
		err := o.Read(&m)
		if err != nil {
			c.pageError("数据无效，请刷新后重试")
		}
	}
	c.Data["hasImg"] = len(m.Img) > 0
	c.Data["m"] = m
	c.setTpl("course/edit.html", "shared/layout_page.html")
	c.LayoutSections = make(map[string]string)
	c.LayoutSections["headcssjs"] = "course/edit_headcssjs.html"
	c.LayoutSections["footerjs"] = "course/edit_footerjs.html"

	//将页面左边菜单的某项激活
	c.Data["activeSidebarUrl"] = c.URLFor("CourseController.Index")
}

//Save 添加、编辑页面 保存
func (c *CourseController) Save() {
	var err error
	m := models.Course{}
	//获取form里的值
	if err = c.ParseForm(&m); err != nil {
		c.jsonResult(enums.JRCodeFailed, "提交表单数据失败，可能原因："+err.Error(), m.Id)
	}
	o := orm.NewOrm()
	if m.Id == 0 {
		m.Creator = &c.curUser
		if _, err = o.Insert(&m); err == nil {
			c.jsonResult(enums.JRCodeSucc, "添加成功", m.Id)
		} else {
			c.jsonResult(enums.JRCodeFailed, "添加失败，可能原因："+err.Error(), m.Id)
		}

	} else {
		oM, err := models.CourseOne(m.Id)
		oM.Name = m.Name
		oM.ShortName = m.ShortName
		oM.Seq = m.Seq
		oM.Price = m.Price
		oM.RealPrice = m.RealPrice
		oM.Img = m.Img
		if _, err = o.Update(oM); err == nil {
			c.jsonResult(enums.JRCodeSucc, "编辑成功", m.Id)
		} else {
			utils.LogDebug(err)
			c.jsonResult(enums.JRCodeFailed, "编辑失败", m.Id)
		}
	}

}

//Delete 批量删除
func (c *CourseController) Delete() {
	strs := c.GetString("ids")
	ids := make([]int, 0, len(strs))
	for _, str := range strings.Split(strs, ",") {
		if id, err := strconv.Atoi(str); err == nil {
			ids = append(ids, id)
		}
	}
	if num, err := models.CourseBatchDelete(ids); err == nil {
		c.jsonResult(enums.JRCodeSucc, fmt.Sprintf("成功删除 %d 项", num), 0)
	} else {
		c.jsonResult(enums.JRCodeFailed, "删除失败", 0)
	}
}

func (c *CourseController) UpdateSeq() {
	Id, _ := c.GetInt("pk", 0)
	oM, err := models.CourseOne(Id)
	if err != nil || oM == nil {
		c.jsonResult(enums.JRCodeFailed, "选择的数据无效", 0)
	}
	value, _ := c.GetInt("value", 0)
	oM.Seq = value
	o := orm.NewOrm()
	if _, err := o.Update(oM); err == nil {
		c.jsonResult(enums.JRCodeSucc, "修改成功", oM.Id)
	} else {
		c.jsonResult(enums.JRCodeFailed, "修改失败", oM.Id)
	}
}
func (c *CourseController) UploadImage() {
	//这里type没有用，只是为了演示传值
	stype, _ := c.GetInt32("type", 0)
	if stype > 0 {
		f, h, err := c.GetFile("fileImg")
		if err != nil {
			c.jsonResult(enums.JRCodeFailed, "上传失败", "")
		}
		defer f.Close()
		filePath := "static/upload/" + h.Filename
		// 保存位置在 static/upload, 没有文件夹要先创建
		c.SaveToFile("fileImg", filePath)
		c.jsonResult(enums.JRCodeSucc, "上传成功", "/"+filePath)
	} else {
		c.jsonResult(enums.JRCodeFailed, "上传失败", "")
	}
}
