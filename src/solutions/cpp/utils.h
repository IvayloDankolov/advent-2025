#pragma once

#include <ranges>
#include <type_traits>

template <class R, class T>
concept InputRangeOf =
    std::ranges::input_range<R> &&
    std::same_as<std::ranges::range_value_t<R>, T>;

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

template <typename State, typename Func>
struct ScanAdaptor
{
    ScanAdaptor(State state, Func func) : initial_state(std::move(state)), accumulator(std::move(func)) {}

    template <std::ranges::input_range R>
    friend auto operator|(R &&r, const ScanAdaptor &adaptor)
    {
        return detail::lazy_scan_impl(std::forward<R>(r), adaptor.initial_state, adaptor.accumulator);
    }

private:
    State initial_state;
    Func accumulator;
};

// lazy_scan
// Arguments:
// - initial_state: the starting state value carried through the scan.
// - f: a callable taking `(State&, element)` and returning the new state; it is invoked for each element.
// Returns:
// - A range adaptor closure that, when piped a range, yields a view of successive states (prefix scan).
// Example usage:
//   auto v = std::vector<int>{1,2,3};
//   auto states = v | lazy_scan(0, [](int s, int x){ return s + x; });
//   // states yields: 1, 3, 6
//   // Can be combined:
//   auto hits = states | std::views::filter([](int s){ return s % 2 == 0; });
// Notes:
// - Works with any `std::ranges::input_range` whose `range_value_t` matches the callable.
// - The state is updated eagerly on iteration; the returned object is a lazy view.
auto lazy_scan(auto initial_state, auto f)
{
    return ScanAdaptor<std::decay_t<decltype(initial_state)>, std::decay_t<decltype(f)>>{std::move(initial_state), std::move(f)};
}

template <
    std::ranges::input_range R,
    typename Init,
    typename F>
constexpr auto fold_left(R &&r, Init init, F f)
{
    for (auto &&e : r)
        init = std::invoke(f, std::move(init), std::forward<decltype(e)>(e));

    return init;
}

std::tuple<int, int> divmod(int numerator, int denominator)
{
    int quotient = numerator / denominator;
    int remainder = numerator % denominator;
    if (remainder < 0)
    {
        remainder += abs(denominator);
        quotient -= 1;
    }
    return {quotient, remainder};
}
