use std::fs::File;
use std::io::{self, BufRead};

#[derive(Debug)]
enum Tile {
    Empty,
    Start,
    Splitter,
}

type Grid = Vec<Vec<Tile>>;
type Beamform = Vec<bool>;

fn parse_grid<I>(lines: I) -> Grid
where
    I: IntoIterator<Item = io::Result<String>>,
{
    return lines
        .into_iter()
        .map(|line_result| {
            let line = line_result.expect("Failed to read line");
            line.chars()
                .map(|c| match c {
                    '.' => Tile::Empty,
                    'S' => Tile::Start,
                    '^' => Tile::Splitter,
                    _ => panic!("Unknown tile character: {}", c),
                })
                .collect()
        })
        .collect();
}

fn total_beams(beamform: &Beamform) -> i32 {
    beamform.iter().filter(|&&b| b).count() as i32
}

fn propagate_beam(beamform: &Beamform, row: &Vec<Tile>) -> (Beamform, i32) {
    let mut new_beamform = vec![false; row.len()];

    let mut total_splits = 0;

    for (col_idx, &has_beam) in beamform.iter().enumerate() {
        match row[col_idx] {
            Tile::Empty => {
                new_beamform[col_idx] |= has_beam;
            }
            Tile::Start => {
                new_beamform[col_idx] = true;
            }
            Tile::Splitter => {
                if has_beam {
                    total_splits += 1;
                    if col_idx > 0 {
                        new_beamform[col_idx - 1] = true;
                    }
                    if col_idx + 1 < row.len() {
                        new_beamform[col_idx + 1] = true;
                    }
                }
            }
        }
    }

    (new_beamform, total_splits)
}

fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        println!("Please provide an input file");
        return;
    }

    let input_path = &args[1];

    let file = File::open(input_path).expect("Failed to open input file");
    let reader = io::BufReader::new(file);

    let grid = parse_grid(reader.lines());
    let initial_beamform = vec![false; grid[0].len()];

    let (final_beamform, total_splits) =
        grid.iter()
            .fold((initial_beamform, 0), |(current_beamform, splits), row| {
                let (new_beamform, new_splits) = propagate_beam(&current_beamform, row);
                (new_beamform, splits + new_splits)
            });

    println!("Total beams: {}", total_beams(&final_beamform));
    println!("Total splits: {}", total_splits);
}
