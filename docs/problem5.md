# Day 5

Before we do anything, our obligatory roll.

<img src="roll5.jpg" alt="Wheel of fortune rolled Go" style="width:400px">

Alright then, let me remember what the toolchain for this looks like it's been a while. Incoming hot take warning, but I'll save that for the postmortem.

I decided to do some refactoring on my runner too as the definitions file was getting quite messy, and realistically there's only 2 modes that mostly matter - compiled and interpreted. Gave it a bit too much freedom originally.
