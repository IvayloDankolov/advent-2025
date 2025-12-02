#include <print>
#include <charconv>
#include <string_view>
#include <fstream>
#include <ranges>
#include <concepts>
#include <type_traits>
#include <functional>

const int DIAL_SIZE = 100;
const int DIAL_INITIAL = 50;
const int DIAL_DESIRED_POS = 0;

// 1. The implementation function (slightly modified to accept arguments in the correct order for the adaptor)
namespace detail
{
    template <std::ranges::input_range R, typename State, typename F>
        requires std::copyable<State> &&
                 std::invocable<F, State &, std::ranges::range_value_t<R>> &&
                 std::assignable_from<State &, std::invoke_result_t<F, State &, std::ranges::range_value_t<R>>>
    auto lazy_scan_impl(R &&r, State initial_state, F f)
    {
        return std::views::transform(std::forward<R>(r),
                                     [state = std::move(initial_state), accumulator = std::move(f)](const auto &current_element) mutable
                                     {
                                         state = accumulator(state, current_element);
                                         return state;
                                     });
    }
}

// 2. The Range Adaptor Closure Object
//    This struct holds the initial_state and function f, waiting for the range R.
template <typename State, typename Func>
struct ScanAdaptor
{
    ScanAdaptor(State state, Func func) : initial_state(std::move(state)), accumulator(std::move(func)) {}

    // Overload the pipe operator to connect a range R to our implementation function
    template <std::ranges::input_range R>
    friend auto operator|(R &&r, const ScanAdaptor &adaptor)
    {
        return detail::lazy_scan_impl(std::forward<R>(r), adaptor.initial_state, adaptor.accumulator);
    }

private:
    // We store the arguments necessary for the eventual call to lazy_scan_impl
    // Note: In a production library, these types would be heavily constrained and use perfect forwarding.
    State initial_state;
    Func accumulator;
};
// 3. The public interface function
// This function returns the adaptor object, making it callable with only 2 arguments.
auto lazy_scan(auto initial_state, auto f)
{
    return ScanAdaptor<std::decay_t<decltype(initial_state)>, std::decay_t<decltype(f)>>{std::move(initial_state), std::move(f)};
}

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

int count_dial_hits(int desired_position, int start_position, std::ranges::input_range auto &&rotations)
    requires std::same_as<std::ranges::range_value_t<decltype(rotations)>, int>
{
    auto filtered_view = rotations |
                         lazy_scan(start_position, apply_rotation) |
                         std::views::filter([desired_position](int dial_position)
                                            { return dial_position == desired_position; });
    return std::ranges::distance(filtered_view);
}

int main(int argc, char **argv)
{
    if (argc < 2)
    {
        std::println("Usage: {} <input-file>", argv[0]);
        return 1;
    }

    std::ifstream input_file(argv[1]);
    auto lines = std::ranges::istream_view<std::string>(input_file);

    auto rotations = lines | std::views::transform(calculate_rotation);

    int hits_at_0 = count_dial_hits(DIAL_DESIRED_POS, DIAL_INITIAL, rotations);

    std::println("Dial hits at position {}: {}", DIAL_DESIRED_POS, hits_at_0);

    return 0;
}