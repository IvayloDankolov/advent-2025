fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        println!("Please provide an input file");
        return;
    }

    let input_path = &args[1];
    let input = std::fs::read_to_string(input_path).expect("Failed to read input file");

    println!("{}", input);
}
