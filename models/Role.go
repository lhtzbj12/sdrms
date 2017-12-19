package models

import (
	"github.com/astaxie/beego/orm"
)

func (a *Role) TableName() string {
	return RoleTBName()
}

type RoleQueryParam struct {
	BaseQueryParam
	NameLike string
}

//用户角色
type Role struct {
	Id                 int    `form:"Id"`
	Name               string `form:"Name"`
	Seq                int
	RoleResourceRel    []*RoleResourceRel    `orm:"reverse(many)" json:"-"` // 设置一对多的反向关系
	RoleBackendUserRel []*RoleBackendUserRel `orm:"reverse(many)" json:"-"` // 设置一对多的反向关系
}

//获取分页数据
func RolePageList(params *RoleQueryParam) ([]*Role, int64) {
	query := orm.NewOrm().QueryTable(RoleTBName())
	data := make([]*Role, 0)
	//默认排序
	sortorder := "Id"
	switch params.Sort {
	case "Id":
		sortorder = "Id"
	case "Seq":
		sortorder = "Seq"
	}
	if params.Order == "desc" {
		sortorder = "-" + sortorder
	}
	query = query.Filter("name__istartswith", params.NameLike)
	total, _ := query.Count()
	query.OrderBy(sortorder).Limit(params.Limit, params.Offset).All(&data)
	return data, total
}

//获取角色列表
func RoleDataList(params *RoleQueryParam) []*Role {
	params.Limit = -1
	params.Sort = "Seq"
	params.Order = "asc"
	data, _ := RolePageList(params)
	return data
}

//批量删除
func RoleBatchDelete(ids []int) (int64, error) {
	query := orm.NewOrm().QueryTable(RoleTBName())
	num, err := query.Filter("id__in", ids).Delete()
	return num, err
}
func RoleOne(id int) (*Role, error) {
	o := orm.NewOrm()
	m := Role{Id: id}
	err := o.Read(&m)
	if err != nil {
		return nil, err
	}
	return &m, nil
}
