package router

import (
	"gobang/middleware"
	"gobang/websocket"

	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(middleware.ReqLogger(), gin.Recovery())
	m := websocket.InitMelody()
	r.GET("/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})
	return r
}
