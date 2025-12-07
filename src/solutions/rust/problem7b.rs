use std::fs::File;
use std::io::{self, BufRead};

#[derive(Debug)]
enum Tile {
    Empty,
    Start,
    Splitter,
}

type Grid = Vec<Vec<Tile>>;
// We're in the quantum world now baby
type Beamform = Vec<i64>;

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

fn propagate_beam(beamform: &Beamform, row: &Vec<Tile>) -> Beamform {
    let mut new_beamform = vec![0; row.len()];

    for (col_idx, &paths) in beamform.iter().enumerate() {
        match row[col_idx] {
            Tile::Start => {
                new_beamform[col_idx] = 1;
            }
            Tile::Splitter => {
                if col_idx > 0 {
                    new_beamform[col_idx - 1] += paths;
                }
                if col_idx + 1 < row.len() {
                    new_beamform[col_idx + 1] += paths;
                }
            }
            Tile::Empty => {
                new_beamform[col_idx] += paths;
            }
        }
    }

    new_beamform
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
    let initial_beamform = vec![0; grid[0].len()];

    let final_beamform = grid.iter().fold(initial_beamform, |current_beamform, row| {
        propagate_beam(&current_beamform, row)
    });

    println!(
        "Total quantum paths: {}",
        final_beamform.iter().sum::<i64>()
    );
}
