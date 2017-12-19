package main

import (
	_ "github.com/lhtzbj12/sdrms/routers"
	_ "github.com/lhtzbj12/sdrms/sysinit"

	"github.com/astaxie/beego"
)

func main() {
	beego.Run()
}
