#include <print>
#include <charconv>
#include <string_view>
#include <fstream>

int main(int argc, char **argv)
{
    if (argc < 2)
    {
        std::println("Usage: {} <input-file>", argv[0]);
        return 1;
    }
    std::ifstream input(argv[1]);

    std::println("Hello, Advent of Code 2025!");

    for (std::string line; std::getline(input, line);)
    {
        std::println("Read line: {}", line);
    }

    return 0;
}