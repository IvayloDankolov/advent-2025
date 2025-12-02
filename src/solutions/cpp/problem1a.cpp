#include <print>
#include <charconv>
#include <string_view>
#include <fstream>
#include <ranges>
#include <concepts>
#include <type_traits>
#include <functional>
#include "utils.h"

namespace ranges = std::ranges;
namespace views = std::views;

const int DIAL_SIZE = 100;
const int DIAL_INITIAL = 50;
const int DIAL_DESIRED_POS = 0;

int calculate_rotation(const std::string &operation)
{
    char direction = operation[0];
    int steps = 0;
    std::from_chars(operation.data() + 1, operation.data() + operation.size(), steps);
    return direction == 'L' ? -steps : steps;
}

int apply_rotation(int current_dial, int rotation)
{
    int remainder = (current_dial + rotation) % DIAL_SIZE;
    return remainder < 0 ? remainder + DIAL_SIZE : remainder;
}

int count_dial_hits(int desired_position, int start_position, InputRangeOf<int> auto &&rotations)
{
    auto filtered_positions = rotations |
                              lazy_scan(start_position, apply_rotation) |
                              views::filter([desired_position](int dial_position)
                                            { return dial_position == desired_position; });
    return ranges::distance(filtered_positions);
}

int main(int argc, char **argv)
{
    if (argc < 2)
    {
        std::println("Usage: {} <input-file>", argv[0]);
        return 1;
    }

    std::ifstream input_file(argv[1]);
    auto lines = ranges::istream_view<std::string>(input_file);

    auto rotations = lines | views::transform(calculate_rotation);

    int hits_at_0 = count_dial_hits(DIAL_DESIRED_POS, DIAL_INITIAL, rotations);

    std::println("Dial hits at position {}: {}", DIAL_DESIRED_POS, hits_at_0);

    return 0;
}