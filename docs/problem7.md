# Day 7

Yay, first chance I've had this week to catch up and do 2 in a row, after wasting all of Monday with the execution boilerplate. Let's see what fortune has in store for us...

<img src="roll7.jpg" alt="Wheel of fortune rolled Rust" style="width:400px">

Cool, let's see if I'm Rust-y or rusty. I might be living on _borrowed_ time after that joke.

Yeah alright I'll show myself out.

Thankfully unlike Kotlin I use the toolchain for this a bit more regularly. On to the problem.

## First impressions

Ah yes, a classic recombobulator misalignment in the perihelic quantum transference coils. Let me grab my sonic screwdriver and it'll be a piece of cake.

I was wondering if we'd get to actual map/graph/labyrinth problems soon. Looks like we're about to hit the meatier stuff. Well, depending on what part 2 of this looks like.

The example reminds me of that lottery game where a ball randomly hits pegs on the way down and goes left or right.

The first part is pretty easily as a vector problem in exactly the same way the example shows. Let's do some mapping.

Did I auto pilot and read this as returning the total beams when you reach the bottom? Most definitely. Thankfully adding the splits as extra state wasn't the most difficult thing in the world

## Part two

I swear when I was poking fun at this earlier I did not actually predict we'd go full quantum on it.

Thankfully, rather than simulating every world, we can just a Feynman Path Integral at it. Or a Path Sum in this case, I suppose, since we're in a discrete world.

Now you might think I'm just making physics jokes here, but "summing all the paths" and the path integral are an actual thing and you can legitimately calculate a new state of the wave function / quantum system that way. Since the wave function is over complex amplitudes and not classical objects it obviously gets a bit tricky but the intuition is not a million miles removed here.

Let's go fix our timeline.

Doh, I didn't even consider how exponential this gets. Thankfully Rust to the rescue here with auto panicking on overflow! Otherwise I might've been dinged if it overflowed back to a positive number and I submitted that.

## Postmortem

I'm not really going to wax poetic even more about rust, plenty of people have done that. It has its ups and downs, but having something in the space of systems languages without the years of baggage that C/C++ carry really shows its advantages in places where you can pick sensible defaults.

And it's nice that we're sort of co-evolving into a space where we about Data in a very declarative way and expressing effects and transformations as part of the type system rather than something only observed through incidental means (nulls, exceptions, or the interactions of objects).

Also really great to be finally caught up! Looking forward to the rest of AoC next week.
