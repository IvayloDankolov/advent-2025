# Day 2

Before we do anything, let's spin our wheel.

<img src="roll2.jpg" alt="Wheel of fortune rolled Lua" style="width:400px">

Oh dear, I haven't wrote Lua outside of WoW addons in probably forever, let me actually figure out how you run this in the command line.

Alright, I mean of course there's a lua executable, it's just not something that ever comes up when you only use it in embedded mode, OK? Anyway, onto the actual statement...

## First impressions

Yeah that is a bit of a step up of difficult now, innit?

I don't know if I rolled an unusual input, but it only gave me 37 ranges and about 2 million numbers to check if we were doing it naively.

That's honestly almost too generous. This almost seems designed to shatter your brute force dreams by just giving a few repeated 10 billion + ranges

I'm almost tempted to just go for it, but I have a sneaking suspicion they're saving that little trick for part 2

Also, I procced Lua on this, and I am not going to go the extra mile to make it memory efficient. Even streamed reading is a royal pain in the ass when the file isn't neatly split into lines, and I refuse to preprocess the input it's not in the spirit of the competition.

## Are we actually going to properly solve it

Well, to do that there's two possible ways you can approach this,
either fully bottom by just saying, hey let's generate all possible numbers that fit this pattern. I can feel this is going to be a mouthful so let's call them... tautological numbers. Hey that actually sounds good.
Anyway, then you just take each range, binary partition both ends and count how many tautological numbers you covered. Piece of cake.

The second way would be coming up with an algorithm to say, given n, what's the next topological number after n? Then apply that on the left of each end and iterate until you run out.

But are any of these theoretical approaches viable? For the first one, given the input ranges go up to until around 10 billion, it will only work if there's way fewer tautological numbers than there are numbers. It does seem to intuitively be the case. The second approach is viable if the generation step to the next number is either constant or logarithmic. Also, a lot of overlapping ranges will favor approach 1 since we're reusing the work.

But let's answer how many are there actually. Pretty obviously 0 for any odd-digit number as it can't be made up of 2 identical chunks,
and if N = 10 ^ 2k, then I believe 10^k - 10(k^1) (we have to not allow leading 0s, remember). So for 2 digit numbers, 10 - 1 = 9, which is obviously true, 4 digit numbers 100 - 10 = 90. And they would be 10-19 doubled up, 20-29, ...90-99 . Yeah it works.

So for everything under 10 billion, it's 10^5 - 10^4 + 10^4 - 10^3 + ... 10^1 - 10^0 = 99999

OK yeah that's not a lot of numbers

Feels like it should also be pretty easy to generate them though. Take a random 8 digit number: 84329312. Cut the first half and doubel it up: 84328432. If that's greater than N, perfect. Otherwise we plus one it, 84338433. This obviously has the neat property that just like regular numbers, if you +1 it past 99...9 it just goes up a tier to the next tautological number, 1000010000. For odd numbers we just go to the next power of 10 and start from the first tautological number there.

And that feels so light that we shouldn't need to do absolutely any caching so let's just go.

Yep, that turned out as straightforward as possible, basically. We'll leave it here since I'm out of time for part 2 at this point
