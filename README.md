# Advent of code 2025

A small runner harness and solutions to the problems from Advent of Code 2025.

## How do I run this

Clone and make sure you have gitlfs enabled if you want the amazing content of all the language random rolls.

Make sure you have the standard dev environment for whatever language the day's problem is in your PATH. We're only using the most standard packages / compilers / interpreters offered by that language here and nothing else.

For the test harness, you'll need Node.js, and in particular a modern enough version that has top level await and modules rather than commonjs.

Specifically for C++, I chose to go with clang/LLVM as the compiler of choice. If you're a fan of GCC instead, you can change the definition in `runners.ts`

To run, you can use the handy shell script and call `./advent N[a|b] <input-file>` in your terminal where N is the day number and
a and b are the easier/harder problem for that day.

The test runner technically just sends any arguments after the id to the solver program, which could come in handy if using this for something other than Advent of Code, but by convention pretty much all the test programs will expect an input file as the first command line argument.

## What language is it in?

I figured let's make a lottery so each new day is a pleasant surprise. So by the completely fair and objective criteria of "whatever name came to mind next", I picked 12 programming languages and we're going to let the legally distinct rotary device of good luck decide what our fate is each day. So far, the picks are:

1. C++
2. Lua
3. Swift
4. Typescript
5. Go
6. Kotlin
7. Rust

The remaining languages for the draw are:

-   Haskell
-   Python
-   Java
-   Clojure
-   C#

Also, apparently the most popular language according to Stack Overflow is Javascript again, and I'm not writing a test harness in that so we'll compromise with Typescript.

## Project structure

The base language of the test runner is Typescript, and thus at the top level this is a pretty standard TS package. Since I'm not expecting this to ever be deployed in a production environment (the production environment is your terminal!), we're not doing a recompile and just using ts-node as a class loader to import Typescript files directly.

The runner and language definitions code is at the first level of `src/`, while `src/solutions` contains each day's solutions, grouped in folders by language type. The folder names match the definitions in `runners.ts`

Beyond that, self-imposed rules are no third party packages or build systems involved (as much as is avoidable) for any of the languages.

## Why not post after Christmas

Honestly I'm not sure how religiously we'll follow the advent calendar, pun intended, so it will ultimately depend on free time. However, with no global leaderboard and everyone being a smartass and just brute forcing problems with LLM agents if you care at all about about this being a competition in any way, I'm sorry to say that it's dead.

Just have fun and do them at your own pace, and maybe don't search solutions on Github until you've had your fill and are ready to compare notes.
