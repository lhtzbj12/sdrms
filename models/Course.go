package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

// TableName 设置Course表名
func (a *Course) TableName() string {
	return CourseTBName()
}

// CourseQueryParam 用于搜索的类
type CourseQueryParam struct {
	BaseQueryParam
	NameLike string
}

// Course 实体类
type Course struct {
	Id        int
	Name      string `orm:"size(32)"`
	ShortName string `orm:"size(8)"`
	Price     float32
	RealPrice float32
	Img       string `orm:"size(256)"`
	StartTime time.Time
	EndTime   time.Time
	Seq       int
	Creator   *BackendUser `orm:"rel(fk)"` //设置一对多关系
}

// CoursePageList 获取分页数据
func CoursePageList(params *CourseQueryParam) ([]*Course, int64) {
	query := orm.NewOrm().QueryTable(CourseTBName())
	data := make([]*Course, 0)
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

// CourseBatchDelete 批量删除
func CourseBatchDelete(ids []int) (int64, error) {
	query := orm.NewOrm().QueryTable(CourseTBName())
	num, err := query.Filter("id__in", ids).Delete()
	return num, err
}

// CourseOne 获取单条
func CourseOne(id int) (*Course, error) {
	o := orm.NewOrm()
	m := Course{Id: id}
	err := o.Read(&m)
	if err != nil {
		return nil, err
	}
	return &m, nil
}
