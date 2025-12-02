# Day 1

Let's do our first language pick. Drum roll...

And it's our trusty old pal C++/

<img src="roll1.jpg" alt="Wheel of fortune rolled C++" style="width:400px">

Although it did keep edging me out with Lua for a solide 5 seconds.

At this point, I'm hilariously out of time, so I guess it's a good thing these release every other day.

# Day 2

Alright, so I guess this is going to be mostly stream of consciousness stuff. I'll try to keep it fairly organised.

## Actually opening the problem this time and first impressions

Ah yes, the elves discovered the power of making someone else do all the work and calling it an emergency.

OK, it reads deceptively straightforward on first glance, but let me quickly account for the fact that each day has 2 parts.

I've committed many C++ sins in the past with incomprehensible competitive coding, so I'll make an effort to atone with some C++23 here.

OK, we're back with working input passing. Now, I guess we really are starting off.

It strikes me that there's pretty much 0 room for algorithmic optimization here,
as just reading the input is O(N) and doing N rotations 'manually' is O(N). I guess
we really are starting simple.

### C++ views

In theory they're a great fit for this. We can process the file line by line, describe all the opretations nice and declaratively rather than in a one massive entangled loop and it's all nice and pretty. In theory.

However, to express this functionally, you do need a running total because you're accumulating dial positions and counting how many of them are 0, so you need something like a scanl.

And in practice, holy shit, extending std::ranges to implement a scanl is some of the worst boilerplate I've ever had to deal with, and I've coded an Android app or two in my time. Just some highlights:

-   The concepts being basically a programming language of their own that require you to express every invariant as a type (but without any syntactic sugar),
-   Having to have an executor object a la how the old streams used to work so you could overload the pipe operator (|). It would've been much cleaner if that was defined in range, so range | functor => range. The trouble is then you'd have to do functors and lambdas as a return value would have very interesting lifetime semantics and foot guns if you capture local state and argh I just want to pull my hair out.
-   Auto really only gets you so far

Overall, I get that it's a bit of a catch 22 with having to support old code, but it does mean any newbie trying to actually apply modern syntax is in for a very rough time. I guess if you're writing your own scanl you're probably not so much a newbie and more a stubborn twat that wants to pretent C++ is just as pretty as Haskell, but come on - building abstractions and divide and conquer are the very building blocks of programming. If this thing isn't easily extensible by default then it'll just be dead on arrival.

### OK but did it work?

Errors from getting the template types wrong aside, yeah, first try.
Let me do a quick refactor pass before I pass judgement.

### Refactors

Obviously hiding scan in a utils file reduces the code a bit. Another big one I
realised you can do is basically roll my own `InputRangeOf<T>` concept that does the
range value assertion. Why that isn't the standard and recommended way to use them,
honestly I have no clue. It seems like such a no brainer.

After that and some aliasing we're basically left with:

```language:c++
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
```

I guess yeah, at that point I can see the vision. I'd call myself pretty damned good at C++ though, even if I haven't followed 20 and 23 much (so in C++ terms a 3.5/10, with Bjarne being a 7/10)

Anyway, on to part 2

### Part 2

OK, I see now, it's just an elaborate troll to make it annoying for people trying to write functional C++.

In all seriousness though if part 1 was 0.1/10 this is 0.2/10, but I guess that's alright for a gentle intro.

Can't really avoid expressing this structurally though as (pos, rollovers) -> rotation -> (new_pos, new_rollovers), so our pretty operation chain is gone and we fold instead.

Speaking of folding of course clang does not have fold_left implemented yet... bleeding edge standards and all that.

And of course full disclosure yes I arrogantly fell directly for the rollover gotcha. In this case doing a LN rotation when you're at N and not counting that as a "rollover" since it has quotient 0 and doesn't go negative. Sneaky little bugger.

It does make the negative (left rotation) case a tad ugly but meh.
