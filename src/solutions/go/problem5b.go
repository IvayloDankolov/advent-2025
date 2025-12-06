package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func Run5b(filename string) {
	f, err := os.Open(filename)
	if err != nil {
		log.Fatalf("Give me a real file dumbass")
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)

	ranges := ParseRanges(scanner)
	ids := ParseIDs(scanner)

	cleanRanges := OrganizeRanges(ranges)

	countFresh := int64(0)
	for _, id := range ids {
		if RangesContainID(cleanRanges, id) {
			countFresh++
		}
	}

	fmt.Printf("%d\n", countFresh)
}
