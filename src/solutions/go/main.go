package main

import (
	"log"
	"os"
	"path/filepath"
)

func main() {
	if len(os.Args) < 3 {
		log.Fatalf("Provide an input file kthx")
	}

	inputPath := os.Args[2]

	sourcePath := os.Args[1]
	sourceName := filepath.Base(sourcePath)
	ext := filepath.Ext(sourceName)
	sourceBase := sourceName[0 : len(sourceName)-len(ext)]

	switch sourceBase {
	case "problem5a":
		Run5a(inputPath)
	case "problem5b":
		Run5b(inputPath)
	default:
		log.Fatalf("Unknown source file: %s %s", sourcePath, sourceBase)
	}
}
