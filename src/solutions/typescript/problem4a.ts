import { readFileSync } from "fs";
import { Grid, Tile } from "./grid";
import { It } from "./tools";

if (process.argv.length < 3) {
    console.error("Please provide an input file path");
    process.exit(1);
}

const ACCESSIBLE_BELOW = 4;
function isAccessibleRoll(grid: Grid, row: number, column: number): boolean {
    return (
        grid[row]?.[column] === Tile.Roll &&
        It.countIf(
            Grid.neighbors(grid, row, column),
            (tile) => tile === Tile.Roll
        ) < ACCESSIBLE_BELOW
    );
}

const filePath = process.argv[2]!;

const input = readFileSync(filePath, { encoding: "utf-8" }).trim();
const grid = Grid.parseMap(input);

const accessibleRolls = It.countIf(Grid.allPositions(grid), ([row, column]) =>
    isAccessibleRoll(grid, row, column)
);

console.log(accessibleRolls);
