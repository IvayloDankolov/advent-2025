import java.io.File
import kotlin.system.exitProcess

enum class Operation {
    ADD, MUL
}

sealed interface Row {
    data class Values(val values: ArrayList<Long>) : Row
    data class Operations(val operations: ArrayList<Operation>) : Row
}

fun parseRow(line: String): Row {
    val tokens = line.split(" ").map { it.trim() }.filter { it.isNotEmpty() }
    if (tokens.isEmpty()) {
        throw IllegalArgumentException("Empty line")
    }
    val firstToken = tokens[0]
    if(firstToken.isEmpty()) {
        throw IllegalArgumentException("Empty token")
    }
    return if (firstToken[0].isDigit()) {
        val values = tokens.map { it.toLong() }
        Row.Values(ArrayList(values))
    } else {
        val operations = tokens.map {
            when (it) {
                "+" -> Operation.ADD
                "*" -> Operation.MUL
                else -> throw IllegalArgumentException("Unknown operation: $it")
            }
        }
        Row.Operations(ArrayList(operations))
    }
}

fun operateOnColumns(rows: ArrayList<Row>): List<Long> {
    val numericRows = (rows.filterIsInstance<Row.Values>() as ArrayList<Row.Values>)
        .map { it.values }
    val operationRows = rows.filterIsInstance<Row.Operations>() as ArrayList<Row.Operations>

    if(operationRows.size != 1) {
        throw IllegalArgumentException("Expected exactly one operation row, got ${operationRows.size}")
    }

    val operations = operationRows[0].operations

    val totalNumRows = numericRows.size
    val totalCols = numericRows[0].size // Mind you you should actually validate that's tru for all rows in a real world scenario

    return (0..totalCols-1)
        .map { col ->
            val op = operations[col]
            var colResult = when(op) {
                Operation.ADD -> 0L
                Operation.MUL -> 1L
            }

            for (row in 0 until totalNumRows) {
                val value = numericRows[row][col]
                when(op) {
                    Operation.ADD -> colResult += value
                    Operation.MUL -> colResult *= value
                }
            }

            colResult
        }
}

if(args.isEmpty()) {
    println("Please provide an input file")
    exitProcess(1)
}

val filename = args[0]

val rows = File(filename).useLines { lines ->
    ArrayList(lines.map { parseRow(it) }.toList())
}

val results = operateOnColumns(rows)
val sum = results.sum()

println(sum)