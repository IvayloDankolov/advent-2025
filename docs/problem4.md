# Day 4

I'm way too bloody tired on a Friday, but let's at least do something and see what the wheel has in store for us.

<img src="roll4.jpg" alt="Wheel of fortune rolled Typescript" style="width:400px">

Well, given that our test runner is Typescript this won't be the most difficult thing in the world to set up. Probably best not to give it an unfair advantage by importing it inside the runner though.

OK never mind, type:module vs type:commonjs is such a damned pain in the ass. That was a pointless waste of 5 mins. Anyway, let's read the actual problem.

## First impressions

That's it I'm calling OSHA on this whole damned operation. How are there no emergency stairways for when the lifts are offline and breaking a wall with a forklift must violate at least a dozen workplace safety rules.

Alright I'm so going to abuse array out of bounds returning undefined here, perfect.
But also again, there isn't really much room for misinterpretation of this. You look at adjacent cells and count, and you load it up in a 2d array for constant time access. It's, uh, pretty cut and dry to be honest.

And the shiny star is ours. Let's see what the part 2 twist is.

## Part two impressions

Right. Now, this is the kind of thing that if you were doing a programming competition you'd have the evil judges set a 10k x 10k daisy chain that would take 50 thousand steps to clear and your naive solution blows up past the 1 second limit.

Fortunately for us we could solve this the dumbest possible way and it'll work just fine.

The question is do I want to bother optimising it at all.

I think not especially outside of precomputing a second grid of neighbours.

Though I guess we could do some Sets. eh... A hash set would only be a big optimistion if you have much fewer rolls than tiles in the grid.

However it makes the TS iteration cleaner, so we'll do it purely for aesthetics.

Did it work first try? You bet.

## Postmortem

I appreciate this isn't meant to be nightmarishly difficult. My instincts were screaming mazes, pathfinding and the good old Sokoban game,
but any of those would be a pretty evil step up in difficulty compared to how easily we've been cruising so far.

That said I do hope by 12 we get some head scratchers. So far 1 and 2 have been a bit more fiddly than 3 and 4, although 2 mainly because I wanted to do number theory on it rather than just bloody brute forcing it.

## On Typescript

Reject lodash and embrace iterators. Seriously. For how meme-worthy JS is due to how it started and evolved, TS has always been shockingly practical and outside of a true functional language probably has the best type system, weirdly enough. Kotlin, Swift and Rust are also in contention there, but it's nice having a browser language that has amazing generics and union/intersection types.
