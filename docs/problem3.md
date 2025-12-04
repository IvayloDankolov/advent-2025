# Day 3

Yes I realise I'm basically on a 1 day delay at this point, but it makes sense to label these with the IDs of the problems.
Maybe I'll catch up over the weekend, not like I have a lot of time after work.

Anyway, let's do the big spin for today and it's...

<img src="roll3.jpg" alt="Wheel of fortune rolled Swift" style="width:400px">

Great, now I have to figure out how to compile Swift in server mode without Xcode.

_2 minutes later..._

Yeah I didn't really expect that to be the difficult part.

## First impressions

Looks like the elves replaced all the engineers with project managers given how much everything is falling apart

Now, it could be that I'm just super suspicious from being hurt one too many times in past contests, but the trap here seems really obvious:

-   Part 1 is the most trivial greedy thing ever - grab the first biggest number (that isn't in the last position), then grab the first biggest number after it. Et voila
-   The part 2 will swoop in to shatter all our hopes and dreams

That said there's no chance in hell that I'm doing anything here except the obvious greedy thing, so let's get to it I guess.

Yay, gold star. I mean there's really nothing to say here. Let's instead see how our expectations are going to be absolutely obliterated.

## Part two

... eh? That's honestly a bit more anticlimactic than I expected. Just be even more greedy, recursively.

Yep, quick recursion, first try (after a few recompiles to fix the generic collection types). I guess this is good in a way since I though for sure I'd be completely out of time attempting this now.

## On swift

It does make you feel really dirty, as it should, when taking shortcuts, which generally means a lot of useless error handling when we know more invariants about the data than the compiler does. Of course, in the real world error checks are only useless until one day they aren't and then you get fun crashes and bug reports.

A pretty major frustration with CLI Swift is that there's absolutely no way to tell what's in the open source Foundation it seems without explicitly looking it up on Github or getting a compilation error. That's a bit of a foot gun if you're coming from iOS and expecting things to be there that just aren't.

Anyway, off to bed.
