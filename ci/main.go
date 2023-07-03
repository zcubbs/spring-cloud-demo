package main

import (
	"github.com/zcubbs/dagger-utils/maven"
)

func main() {
	err := buildMavenProject()
	if err != nil {
		panic(err)
	}
}

func buildMavenProject() error {
	mvnBuilder := maven.Builder{}

	err := mvnBuilder.MavenBuild(true)
	if err != nil {
		return err
	}

	return nil
}
