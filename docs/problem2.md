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

## Part 2 first impressions

Aww, and here I was b etting on the twist being palindromes. That would of course be too easy.
There goes my beautiful, efficient p1 solution that involves absolutely no iteration of any numbers in the ranges except the right ones.

Although all hope is not necessarily lost. HEre's some interesting observations in no particular order:

### INCLUSION

Let's call TN(k) all tautological numbers made of a base part of k digits and TN(k, x) the subset of TN(k) numbers that are x digits long. It's clear that `TN(a * k, x>= 2*a*k) ∋ TN(k, x>= 2*a\*k)`.

As much as I don't want to say oh that's obvious, we'll leave the proof as an exercise to the reader, I can't be bothered actually formally proving it. It's just a simple observation. If we're looking at an 8 digit range, we don't have to iterate over all TN(2) and then TN(4), anything 2 digit base you pick like say 53 to get 53535353 you can clearly achieve the same by picking the 4-digit base 5353 and getting 53535353.

Conversely, if we're looking at 2 TN groups that aren't an exact multiple of each other, they will not share most members. The troubling detail here, though, is that word "most". Because every number is multiple of 1, TN(1, x) in every TN(n, x) and so trying to sum up different groups we'll always overcount the numbers that are made of just one digit. Another complication when extending this to really big numbers is if you end up using two compound classes that contain some of the same bases, e.g. 8 and 6 both contain 2.

So what classes would we theoretically have to look at for a 12 digit number

```
TN(6, 12) ∪ TN(4, 12)
```

And that's it, really. But, that union hides a pretty big complexity of how much we're overcounting. Because if we were to sum, we'd have to do

```
sum(TN(6, 12)) + sum(TN(4, 12)) - sum(TN(2, 12))
```

by the inclusion/exclusion principle to avoid double counting. Notice that this doesn't correct for TN(1, 12), because we count it twice and substract it once, so it already self corrected.

### Hard coding

Yeah that will be fun. I think at this point it's easier to just throw an actual set at it and live with the memory tradeoff. Or we just hardcode the sums for numbers up to 10 digits since most of them are pretty trivial:

1. TN(1, 1)
2. TN(1, 2)
3. TN(1, 3)
4. TN(2, 4)
5. TN(1, 5)
6. TN(2, 6) + TN(3, 6) - TN(1, 6)
7. TN(1, 7)
8. TN(4, 8)
9. TN(3, 9)
10. TN(2, 10) + TN(5, 10) - TN(1, 10)

Also if I were a betting man I'd wager a lot of people who optimized away all the odd numbers now forget that 9 = 3\*3

Of course, when we're only restricting ourselves to certain sub-ranges and not just every x-digit number and this would also require the finessing we did in part 1 to find the valid tautological indexes within that range.

But would it really be satisfying if we used meta information about the input to 'cheat' at solving this?

Alright screw it we're doing sets.

### Result

Does it feel a bit anticlimactic just basically brute forcing it? I mean yes but in the first 10 billion numbers there's only 100k tautological numbers even with this expanded definition.

There's no way to justify using anything other than a hash set on this when the whole damned thing takes 20-30 milliseconds to compute in Lua. And as a bonus there's no random sum errors that I have to debug because I messed up the exclusion/exclusion math, it just works (tm)
