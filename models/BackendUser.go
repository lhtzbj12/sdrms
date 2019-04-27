package models

import (
	"github.com/astaxie/beego/orm"
)

// TableName 设置BackendUser表名
func (a *BackendUser) TableName() string {
	return BackendUserTBName()
}

// BackendUserQueryParam 用于查询的类
type BackendUserQueryParam struct {
	BaseQueryParam
	UserNameLike string //模糊查询
	RealNameLike string //模糊查询
	Mobile       string //精确查询
	SearchStatus string //为空不查询，有值精确查询
}

// BackendUser 实体类
type BackendUser struct {
	Id                 int
	RealName           string `orm:"size(32)"`
	UserName           string `orm:"size(24)"`
	UserPwd            string `json:"-"`
	IsSuper            bool
	Status             int
	Mobile             string                `orm:"size(16)"`
	Email              string                `orm:"size(256)"`
	Avatar             string                `orm:"size(256)"`
	RoleIds            []int                 `orm:"-" form:"RoleIds"`
	RoleBackendUserRel []*RoleBackendUserRel `orm:"reverse(many)"` // 设置一对多的反向关系
	ResourceUrlForList []string              `orm:"-"`
	//CreateCourses      []*Course             `rom:"reverse(many)"` // 设置一对多的反向关系
}

// BackendUserPageList 获取分页数据
func BackendUserPageList(params *BackendUserQueryParam) ([]*BackendUser, int64) {
	query := orm.NewOrm().QueryTable(BackendUserTBName())
	data := make([]*BackendUser, 0)
	//默认排序
	sortorder := "Id"
	switch params.Sort {
	case "Id":
		sortorder = "Id"
	}
	if params.Order == "desc" {
		sortorder = "-" + sortorder
	}
	query = query.Filter("username__istartswith", params.UserNameLike)
	query = query.Filter("realname__istartswith", params.RealNameLike)
	if len(params.Mobile) > 0 {
		query = query.Filter("mobile", params.Mobile)
	}
	if len(params.SearchStatus) > 0 {
		query = query.Filter("status", params.SearchStatus)
	}
	total, _ := query.Count()
	query.OrderBy(sortorder).Limit(params.Limit, params.Offset).All(&data)
	return data, total
}

// BackendUserOne 根据id获取单条
func BackendUserOne(id int) (*BackendUser, error) {
	o := orm.NewOrm()
	m := BackendUser{Id: id}
	err := o.Read(&m)
	if err != nil {
		return nil, err
	}
	return &m, nil
}

// BackendUserOneByUserName 根据用户名密码获取单条
func BackendUserOneByUserName(username, userpwd string) (*BackendUser, error) {
	m := BackendUser{}
	err := orm.NewOrm().QueryTable(BackendUserTBName()).Filter("username", username).Filter("userpwd", userpwd).One(&m)
	if err != nil {
		return nil, err
	}
	return &m, nil
}
