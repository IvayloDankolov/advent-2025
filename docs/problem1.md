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
