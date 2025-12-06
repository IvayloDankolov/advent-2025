package main

import (
	"bufio"
	"fmt"
	"log"
	"sort"
)

type Range struct {
	start int64
	end   int64
}

func ParseRanges(scanner *bufio.Scanner) []Range {
	ranges := []Range{}

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			break
		}
		var start, end int64
		_, err := fmt.Sscanf(line, "%d-%d", &start, &end)
		if err != nil {
			log.Fatalf("Failed to parse range from line: %s", line)
		}
		ranges = append(ranges, Range{start, end})
	}

	return ranges
}

func OrganizeRanges(ranges []Range) []Range {
	sort.Slice(ranges, func(i, j int) bool {
		if ranges[i].start < ranges[j].start {
			return true
		}
		if ranges[i].start > ranges[j].start {
			return false
		}
		// Careful, this is subtle. Since we want to be able to remove redundant ranges in one pass,
		// for each range with the same start, we want the one that ends the latest to come first.
		// Therefore, the other redundant ones will be ignored on the cleaning pass.
		return ranges[i].end > ranges[j].end
	})

	removedReduntant := []Range{}
	for _, r := range ranges {
		if len(removedReduntant) == 0 {
			removedReduntant = append(removedReduntant, r)
			continue
		}
		last := &removedReduntant[len(removedReduntant)-1]

		if r.end <= last.end {
			// Remember they're sorted so we're guaranteed r.start >= last.start
			continue
		}

		if r.start <= last.end {
			last.end = r.end
			continue
		}
		removedReduntant = append(removedReduntant, r)
	}

	return removedReduntant
}

func RangesContainID(sortedRanges []Range, id int64) bool {
	idx := sort.Search(len(sortedRanges), func(i int) bool {
		return id < sortedRanges[i].start
	})

	if idx == 0 {
		return false
	}

	r := sortedRanges[idx-1]
	// As per the statement these ranges are inclusive
	return id >= r.start && id <= r.end
}

func ParseIDs(scanner *bufio.Scanner) []int64 {
	ids := []int64{}

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			break
		}
		var id int64
		_, err := fmt.Sscanf(line, "%d", &id)
		if err != nil {
			log.Fatalf("Failed to parse ID from line: %s", line)
		}
		ids = append(ids, id)
	}

	return ids
}
