# Day 6

Chores are all done so maybe we finally catch up today by knocking out 6 and 7, assuming they're reasonably humble. First things first, though, let's do our roll.

<img src="roll6.jpg" alt="Wheel of fortune rolled Kotlin" style="width:400px">

Kotlin, is it? Another one of those things that I've never run outside of the primary intended use case. Let's figure out the tooling...

Also, I seriously can't be bothered using multiple IDEs/editors for this so I guess we're going in without autocomplete.
We'll survive, somehow.

Alrighty, I legitimately was not aware Kotlin Script (.kts) was a legitimate format until about 5 minutes ago. I guess I never had reason to look for that. Neat

## First impressions

Oh boy I sure hope this fits in 64 bits otherwise I'm definitely not first trying this. My input doesn't seem to ever multiply more than 4 4 digit numbers together and there's maybe 100, so ballpark 10^15 should be fine.

Honestly I don't even see any possible room for clever optimisations in part 1, it's just a nice and quick O(n) on the input size.

I guess if you had a massively long file you can try and do file seek + a jump pointer array for the start of each line to solve it in only O(rows) rather than O(rows \* cols) memory, but we're talking probably on the order of 100gb here so it won't fit in ram. Certainly not bothering with that.

Right, that turned out to be accurate. No bignums for the precious star. Now let's see how we're going to twist the knife.
