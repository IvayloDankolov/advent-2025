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
