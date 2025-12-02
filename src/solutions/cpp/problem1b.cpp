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

struct Shift
{
    int pos;
    int rollovers;
};

int calculate_rotation(const std::string &operation)
{
    char direction = operation[0];
    int steps = 0;
    std::from_chars(operation.data() + 1, operation.data() + operation.size(), steps);
    return direction == 'L' ? -steps : steps;
}

Shift apply_rotation(Shift current_dial, int rotation)
{
    auto [q, r] = divmod(current_dial.pos + rotation, DIAL_SIZE);
    int crossings = rotation >= 0 ? q : std::get<0>(divmod(current_dial.pos - 1, DIAL_SIZE)) - std::get<0>(divmod(current_dial.pos + rotation - 1, DIAL_SIZE));
    return Shift{r, current_dial.rollovers + crossings};
}

int count_rollovers(int start_position, InputRangeOf<int> auto &&rotations)
{
    Shift initial_shift{start_position, 0};
    return fold_left(rotations, initial_shift, apply_rotation).rollovers;
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

    int rollovers = count_rollovers(DIAL_INITIAL, rotations);

    std::println("Dial rollovers: {}", rollovers);

    return 0;
}