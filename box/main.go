package main

import (
	"github.com/ddld93/vas-box/box/bindings"
)

func main() {
	// Create a new Gin router
	// router := gin.Default()

	// // Define a route handler
	// router.GET("/", func(c *gin.Context) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"message": "Hello, World!",
	// 	})
	// })

	// // Run the server on port 8080
	// router.Run(":8080")
	bindings.SendSMS()
}


