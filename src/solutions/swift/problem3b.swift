import Foundation

let batteryComponents = 12

enum ParseError: Error {
    case invalidNumericCharacter
}

func parseJoltages(_ lines: [Substring]) throws -> [[Int]] {
    return try lines.map { line in 
        try line.map { char in
            guard let asciiValue = char.asciiValue,
                  let zeroValue = Character("0").asciiValue,
                  asciiValue >= zeroValue && asciiValue <= zeroValue + 9 else {
                throw ParseError.invalidNumericCharacter
            }
            return Int(asciiValue - zeroValue)
        }
    }
}

func largestPossibleJoltage<C: Collection>(_ subjoltages: C, components numComponents: Int) -> Int where C.Element == Int {
    
    if numComponents <= 0 {
        return 0
    }

    let firstDigit = subjoltages.dropLast(numComponents-1).max()!
    let index = subjoltages.firstIndex(of: firstDigit)!

    let nextIndex = subjoltages.index(after: index)
    let remainingSubjoltages = subjoltages[nextIndex...]
    let remainingValue = largestPossibleJoltage(remainingSubjoltages, components: numComponents - 1)

    // This wouldn't really work for more than 54-bit integers but I don't care enough for this use case
    return firstDigit * Int(pow(10.0, Double(numComponents - 1))) + remainingValue
}

let args = CommandLine.arguments
guard args.count == 2 else {
    print("Usage: swift problem3a.swift <input_file>")
    exit(1)

}

// I am not spending the effort to buffer read this line by line
// It's a royal pain in the ass without macos-specific Foundation stuff (FileHandle.lines)
let filename = args[1]
guard let input = try? String(contentsOfFile: filename, encoding: .utf8) else {
    print("Error reading file: \(filename)")
    exit(1)
}

let lines = input.split(separator: "\n")
guard let joltages = try? parseJoltages(lines) else {
    print("Error: Input contains non-numeric characters")
    exit(1)
}

let largestSum = joltages.map { largestPossibleJoltage($0, components: batteryComponents) }.reduce(0, +)

print(largestSum)