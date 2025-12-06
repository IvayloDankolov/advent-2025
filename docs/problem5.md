# Day 5

Before we do anything, our obligatory roll.

<img src="roll5.jpg" alt="Wheel of fortune rolled Go" style="width:400px">

Alright then, let me remember what the toolchain for this looks like it's been a while. Incoming hot take warning, but I'll save that for the postmortem.

I decided to do some refactoring on my runner too as the definitions file was getting quite messy, and realistically there's only 2 modes that mostly matter - compiled and interpreted. Gave it a bit too much freedom originally.

Now let's see what they have in store for us today.

## First impressions

I mean it was obvious from the getgo that we'd be poking fun at management, but boy someone has an axe to grind. OSHA violations, switching inventory systems at the worst possible time... It's like I'm on the malicious compliance subreddit.

Right, the actual problem. I'm sure anyone that's ever done this sort of thing for any length of time has definitely solved some variation of this. It's just such a classic.

I find it interesting, looking through the puzzle input, that while they closed the obvious loophole of having a small enough set of IDs to just solve it with a boolean array, there aren't nearly enough of either in my input (about 200 and 1000) for The naive O(ranges \* ids) to be even remotely non viable, even if we were working with sub-second executions.

The way to solve this "smartly" would be to merge ranges as necessary so they're non-overlapping and sort by the left hand side, bringing you down to `O(log(ranges) * (ranges + ids))`

You're probably not going to get beaten by a for loop doing that for input this small, but it will be a near thing when you also include the parsing time.

Anyway, let's get into it and see if I can properly get into the go mood. Reject abstraction, embrace for loops.

That took a hot minute and it's 120 lines of pure for loop. We only had to lambda 2 times because even go isn't insane enough to not have builtin sort and binary partition I guess. Perfection!

## Part 2 impressions

See folks, that's why you do not brute force. 1/100 times it may or may not pay off. Premature optimization is the key to success. That's how that famous saying goes, right? Right?

Also I do find it amusing that if I had actually bothered to fully remove overlapping ranges rather than just the redundant ones I could've gotten away with not touching anything other than the last 3 lines. Now I have tweak one line in the cleaner too. Sadness.

Oh no, I forgot how anal Go is about packages. I guess the runner idea is just impossible the way it's organized right now and I need janky hacks to get around it. Even more sadness.

That was such an enormous waste of time. Let's solve the actual thing in 10 seconds now, I guess...

_2 minutes later_

Close enough to 10 seconds, I guess. Can we talk about the elves having hundreds of trillions of fresh ingredients though? What the hell are we cooking in there?!

## Postmortem on Go

Back to the spicy hot take, I think the only reason Go has any success and user base at all is purely because of the Google brand and having Rob Pike and Ken Thompson attached to it.

It is a solidly mediocre language and standard library and while it does solve a legitimate problem with C++ being impossible to compile without losing your mind at the scale that some of the Google projects have, that is very much what we call a first world problem.

It's a supremely arrogant language that hates abstractions, while for some reason also embracing garbage collection, and the uphill battle to get generics accepted and implemented is the most prime example of that.

No, "real coders" don't _need_ generics. "Real coders" don't need exceptions or choice types. Real macho men use for loops and handle everything explicitly. And I sort of get that as an anti-movement to the ever-growing incomprehensible sprawl that C++ is becoming, but at the end of the day, however much we like to wax poetic about how simple Go is, languages that claim to be practical should help you solve real world problems efficiently and as Rich Hickey would tell you, something being simple and something being easy are not the same thing. Assembler is beyond simple (talking in the broad sense, not the sprawling mess that is x86, and even Arm is reasonably complex). You can implement an assembler in 30 mins.
Solving things in assembler, well, that's not usually very easy.

The reason every other newer generation language like Kotlin, Swift, and Rust borrow (no pun intended) very heavily from functional programming isn't because we're all just too lazy to write a dadgum loop or check for errors and can't be bothered to learn how to do so, but because 99% of the time you're not inventing something earth shattering and so expressing things declaratively in terms of well known abstractions means you create something much easier to read and maintain and reason about and you don't waste your time at a level inappropriate to the problem. The other 1% of the time you do the dirty work. The fact that abstractions might have a computational cost or are leaky isn't some massive gotcha - sure they are, that's just how the world works. The good ones don't pretend that that isn't the case and get out of your way when they're not appropriate. The bad ones like, say, ORM - well, honestly, the less is spoken about that the better.

OK, rant over.
