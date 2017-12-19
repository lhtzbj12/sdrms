package utils

import (
	"testing"
)

func TestRandomString(t *testing.T) {
	str := RandomString(10)
	InitLogs()
	LogDebug("asdfasdfasdf")
	t.Error(str)
}
