import Foundation

let args = CommandLine.arguments
guard args.count == 2 else {
    print("Usage: swift problem3a.swift <input_file>")
    exit(1)
}

let filename = args[1]
guard let input = try? String(contentsOfFile: filename) else {
    print("Error reading file: \(filename)")
    exit(1)
}

print(input)