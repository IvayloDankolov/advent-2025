export enum Tile {
    Open,
    Roll,
}
export namespace Tile {
    export function fromChar(char: string): Tile {
        switch (char) {
            case "@":
                return Tile.Roll;
            default:
                return Tile.Open;
        }
    }
}

export type Grid<T> = T[][];
export type Position = [number, number];

export namespace Grid {
    export function parseMap(input: string): Grid<Tile> {
        return input
            .split("\n")
            .map((line) => line.split("").map((char) => Tile.fromChar(char)));
    }

    export function* allPositions<T>(grid: Grid<T>): Generator<Position> {
        for (let row = 0; row < grid.length; row++) {
            for (let column = 0; column < grid[row]!.length; column++) {
                yield [row, column];
            }
        }
    }

    export function neightborPositions(
        grid: Grid<unknown>,
        row: number,
        column: number
    ): Position[] {
        const positions: Position[] = [];
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = column - 1; c <= column + 1; c++) {
                if (r === row && c === column) {
                    continue;
                }
                if (
                    r >= 0 &&
                    r < grid.length &&
                    c >= 0 &&
                    c < grid[r]!.length
                ) {
                    positions.push([r, c]);
                }
            }
        }
        return positions;
    }

    export function neighbors<T>(
        grid: Grid<T>,
        row: number,
        column: number
    ): T[] {
        return Grid.neightborPositions(grid, row, column).map(
            ([r, c]) => grid[r]![c]!
        );
    }

    export function mapGrid<T, U>(
        grid: Grid<T>,
        fn: (tile: T, row: number, column: number) => U
    ): Grid<U> {
        return grid.map((row, r) => row.map((tile, c) => fn(tile, r, c)));
    }
}
