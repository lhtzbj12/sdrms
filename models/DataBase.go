package models

import (
	"bufio"
	"io"
	"os"

	"github.com/astaxie/beego/orm"
)

func DataReset() (bool, error) {
	f, err := os.Open("datareset.sql")
	if err != nil {
		return false, err
	}
	defer f.Close()
	o := orm.NewOrm()
	buf := bufio.NewReader(f)
	for {
		line, err := buf.ReadString(';')
		if err != nil {
			if err == io.EOF {
				return true, nil
			}
			return false, err
		}
		_, err = o.Raw(line).Exec()
		if err != nil {
			return false, err
		}
	}
}
