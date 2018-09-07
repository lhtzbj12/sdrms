package models

import "time"

// RoleResourceRel 角色与资源关系表
type RoleResourceRel struct {
	Id       int
	Role     *Role     `orm:"rel(fk)"`  //外键
	Resource *Resource `orm:"rel(fk)" ` // 外键
	Created  time.Time `orm:"auto_now_add;type(datetime)"`
}

// TableName 设置表名
func (a *RoleResourceRel) TableName() string {
	return RoleResourceRelTBName()
}
