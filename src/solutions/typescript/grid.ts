export enum Tile {
    Open,
    Roll,
}
export type Grid = Tile[][];
export type Position = [number, number];

export namespace Grid {
    export function fromChar(char: string): Tile {
        switch (char) {
            case "@":
                return Tile.Roll;
            default:
                return Tile.Open;
        }
    }

    export function parseMap(input: string): Grid {
        return input
            .split("\n")
            .map((line) => line.split("").map((char) => fromChar(char)));
    }

    export function* allPositions(grid: Grid): Generator<Position> {
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row]!.length; column++) {
                yield [row, column];
            }
        }
    }

    export function neighbors(grid: Grid, row: number, column: number): Tile[] {
        return [
            // Above
            grid[row - 1]?.[column - 1],
            grid[row - 1]?.[column],
            grid[row - 1]?.[column + 1],
            // Left/right
            grid[row]?.[column - 1],
            grid[row]?.[column + 1],
            // Below
            grid[row + 1]?.[column - 1],
            grid[row + 1]?.[column],
            grid[row + 1]?.[column + 1],
        ].filter((tile) => tile !== undefined);
    }
}
