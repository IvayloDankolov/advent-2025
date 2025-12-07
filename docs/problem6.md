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

## Part two

Hmm, cephalopods writing Japanse style definitely seems perfectly reasonable. I wonder what inspired that particular association in the author's brain.

Anyway, short dinner break later we're back. Turns out we get to throw away all our code for part 2 as it literally upends the task. OK, I'm slightly exaggerating here, this is actually only about 3% harder than the other option, using a a purely scientific measurement called "vibes".

For once it's significantly easier to express imperatively rather than functionally, so we'll adjust our approach slightly. Oh and, even though we're being very gentle with the memory and size limits and it wouldn't even matter if you solved it naively here, there's a simple trick to make it both more efficient and actually easier to implement: just transpose the matrix as you read.

That lest us use optimized builtin parsing rather than hand rolling our own toInt and in case this was a much tighter input you'll prevent yourself from cache missing k times on every number conversion if the entire thing won't fit in L3.

Finally, obviously both addition and multiplication are commutative so no one cares if cephalopodes read right to left.

Let's put it together.

## Postmortem

I certainly didn't feel like a star, but we have it.

I've realised I'm absolutely incapable of writing Kotlin without autocomplete so that was a fun little exercise in head bashing.

It's still a very pretty language, though. Easy defaults for quick data records is honestly an underrated part of any language that is sensible enough to have them. And algebraic data types or union types or whatever decide to call them in your language are the best thing ever.

By the way, an even better way to save memory is just building the transposed numbers in place without the intermediary string builders, but this isn't the ICO. Let's at least have _some_ standards, however tiny.
