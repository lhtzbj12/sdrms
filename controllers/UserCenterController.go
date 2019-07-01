package controllers

import (
	"strings"

	"github.com/lhtzbj12/sdrms/enums"
	"github.com/lhtzbj12/sdrms/models"
	"github.com/lhtzbj12/sdrms/utils"

	"github.com/astaxie/beego/orm"
)

type UserCenterController struct {
	BaseController
}

func (c *UserCenterController) Prepare() {
	//先执行
	c.BaseController.Prepare()
	//如果一个Controller的所有Action都需要登录验证，则将验证放到Prepare
	c.checkLogin()
}
func (c *UserCenterController) Profile() {
	Id := c.curUser.Id
	m, err := models.BackendUserOne(Id)
	if m == nil || err != nil {
		c.pageError("数据无效，请刷新后重试")
	}
	c.Data["hasAvatar"] = len(m.Avatar) > 0
	utils.LogDebug(m.Avatar)
	c.Data["m"] = m
	c.setTpl()
	c.LayoutSections = make(map[string]string)
	c.LayoutSections["headcssjs"] = "usercenter/profile_headcssjs.html"
	c.LayoutSections["footerjs"] = "usercenter/profile_footerjs.html"
}
func (c *UserCenterController) BasicInfoSave() {
	Id := c.curUser.Id
	oM, err := models.BackendUserOne(Id)
	if oM == nil || err != nil {
		c.jsonResult(enums.JRCodeFailed, "数据无效，请刷新后重试", "")
	}
	m := models.BackendUser{}
	//获取form里的值
	if err = c.ParseForm(&m); err != nil {
		c.jsonResult(enums.JRCodeFailed, "获取数据失败", m.Id)
	}
	oM.RealName = m.RealName
	oM.Mobile = m.Mobile
	oM.Email = m.Email
	oM.Avatar = c.GetString("ImageUrl")
	o := orm.NewOrm()
	if _, err := o.Update(oM); err != nil {
		c.jsonResult(enums.JRCodeFailed, "编辑失败", m.Id)
	} else {
		c.setBackendUser2Session(Id)
		c.jsonResult(enums.JRCodeSucc, "保存成功", m.Id)
	}
}
func (c *UserCenterController) PasswordSave() {
	Id := c.curUser.Id
	oM, err := models.BackendUserOne(Id)
	if oM == nil || err != nil {
		c.pageError("数据无效，请刷新后重试")
	}
	oldPwd := strings.TrimSpace(c.GetString("UserPwd", ""))
	newPwd := strings.TrimSpace(c.GetString("NewUserPwd", ""))
	confirmPwd := strings.TrimSpace(c.GetString("ConfirmPwd", ""))
	md5str := utils.String2md5(oldPwd)
	if oM.UserPwd != md5str {
		c.jsonResult(enums.JRCodeFailed, "原密码错误", "")
	}
	if len(newPwd) == 0 {
		c.jsonResult(enums.JRCodeFailed, "请输入新密码", "")
	}
	if newPwd != confirmPwd {
		c.jsonResult(enums.JRCodeFailed, "两次输入的新密码不一致", "")
	}
	oM.UserPwd = utils.String2md5(newPwd)
	o := orm.NewOrm()
	if _, err := o.Update(oM); err != nil {
		c.jsonResult(enums.JRCodeFailed, "保存失败", oM.Id)
	} else {
		c.setBackendUser2Session(Id)
		c.jsonResult(enums.JRCodeSucc, "保存成功", oM.Id)
	}
}
func (c *UserCenterController) UploadImage() {
	//这里type没有用，只是为了演示传值
	stype, _ := c.GetInt32("type", 0)
	if stype > 0 {
		f, h, err := c.GetFile("fileImageUrl")
		if err != nil {
			c.jsonResult(enums.JRCodeFailed, "上传失败", "")
		}
		defer f.Close()
		filePath := "static/upload/" + h.Filename
		// 保存位置在 static/upload, 没有文件夹要先创建
		c.SaveToFile("fileImageUrl", filePath)
		c.jsonResult(enums.JRCodeSucc, "上传成功", "/"+filePath)
	} else {
		c.jsonResult(enums.JRCodeFailed, "上传失败", "")
	}
}
