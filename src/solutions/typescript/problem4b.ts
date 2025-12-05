import { readFileSync } from "fs";
import { Grid, Position, Tile } from "./grid";
import { Gen, It } from "./tools";

if (process.argv.length < 3) {
    console.error("Please provide an input file path");
    process.exit(1);
}

function neighborRollGrid(grid: Grid<Tile>): Grid<number> {
    return Grid.mapGrid(grid, (_, row, column) =>
        It.countIf(Grid.neighbors(grid, row, column), (t) => t === Tile.Roll)
    );
}

const ACCESSIBLE_BELOW = 4;
function* removeAllPossibleRolls(
    grid: Grid<Tile>,
    neighborRolls: Grid<number>,
    rollPositions: Set<Position>
): Generator<Position> {
    while (true) {
        const accessible = [
            ...Gen.filter(
                rollPositions,
                ([row, column]) =>
                    neighborRolls[row]?.[column]! < ACCESSIBLE_BELOW
            ),
        ];

        if (accessible.length === 0) {
            return;
        }

        for (const pos of accessible) {
            rollPositions.delete(pos);

            for (const neighbor of Grid.neightborPositions(
                grid,
                pos[0],
                pos[1]
            )) {
                neighborRolls[neighbor[0]]![neighbor[1]]!--;
            }
        }

        yield* accessible;
    }
}

const filePath = process.argv[2]!;

const input = readFileSync(filePath, { encoding: "utf-8" }).trim();
const grid = Grid.parseMap(input);
const neighborRolls = neighborRollGrid(grid);
const rollPositions = new Set<Position>(
    Gen.filter(
        Grid.allPositions(grid),
        ([row, column]) => grid[row]?.[column] === Tile.Roll
    )
);

const removedRolls = removeAllPossibleRolls(grid, neighborRolls, rollPositions);

console.log(It.count(removedRolls));
