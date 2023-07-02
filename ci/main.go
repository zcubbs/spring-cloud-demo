package main

import (
	"context"
	"dagger.io/dagger"
	"fmt"
	"os"
)

func main() {
	ctx := context.Background()

	// initialize Dagger client
	client, err := dagger.Connect(ctx, dagger.WithLogOutput(os.Stdout))
	if err != nil {
		panic(err)
	}
	defer client.Close()

	// use a golang:1.19 container
	// get version
	// execute
	golang := client.Container().From("golang:1.20").WithExec([]string{"go", "version"})

	version, err := golang.Stdout(ctx)
	if err != nil {
		panic(err)
	}

	// print output
	fmt.Println("GO Version: " + version)
}
