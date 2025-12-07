import java.io.File
import kotlin.system.exitProcess

enum class Operation {
    ADD, MUL
}

data class MathProblemsRaw(
    val transposedNumbers: ArrayList<String>,
    val operationsRow: String
)

data class Problem(
    val numbers: Sequence<Long>,
    val operation: Operation
)

data class MathProblemsParsed(
    val problems: List<Problem>
)

val whitespace = Regex("\\s+")

fun readTransposed(lines: Sequence<String>): MathProblemsRaw {
    var builders: ArrayList<StringBuilder>? = null
    for ((rowIndex, line) in lines.withIndex()) {
        if (line.isEmpty()) {
            continue
        }
        val firstChar = line[0]
        if (!firstChar.isDigit() && !firstChar.isWhitespace()) {
            // This is the operations row
            return MathProblemsRaw(
                transposedNumbers = ArrayList(builders?.map { it.toString() } ?: listOf()),
                operationsRow = line
            )
        }
        if (builders == null) {
            builders = ArrayList(List(line.length) { StringBuilder() })
        }
        for ((colIndex, char) in line.withIndex()) {
            builders!![colIndex].append(char)
        }
    }

    throw IllegalArgumentException("No operations row found")
}

fun parseProblems(rawProblem: MathProblemsRaw): MathProblemsParsed {
    val operations = rawProblem.operationsRow.trim().split(whitespace).map {
        when (it) {
            "+" -> Operation.ADD
            "*" -> Operation.MUL
            else -> throw IllegalArgumentException("Unknown operation: $it")
        }
    }

    val problems = mutableListOf<Problem>()

    var currentOperationIdx = 0
    var currentNumbers = mutableListOf<Long>()
    for (line in rawProblem.transposedNumbers) {
        val trimmed = line.trim()

        if (trimmed.isEmpty()) {
            problems.add(
                Problem(
                    numbers = currentNumbers.asSequence(),
                    operation = operations[currentOperationIdx]
                )
            )
            currentOperationIdx += 1
            currentNumbers = mutableListOf()
        } else {
            currentNumbers.add(trimmed.toLong())
        }
        
    }

    problems.add(
        Problem(
            numbers = currentNumbers.asSequence(),
            operation = operations[currentOperationIdx]
        )
    )

    return MathProblemsParsed(problems)
}

fun doMathProblems(parsed: MathProblemsParsed): List<Long> {
    return parsed.problems.map { problem ->
        when (problem.operation) {
            Operation.ADD -> problem.numbers.sum()
            Operation.MUL -> problem.numbers.fold(1L) { acc, v -> acc * v }
        }
    }
}


if(args.isEmpty()) {
    println("Please provide an input file")
    exitProcess(1)
}

val filename = args[0]


val tr = File(filename).useLines { lines ->
    readTransposed(lines)
}

val problems = parseProblems(tr)

val solutions = doMathProblems(problems)

println(solutions.sum())