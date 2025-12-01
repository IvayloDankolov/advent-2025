# Node baggage

It's interesting how much node shows its age in some of the very basic standard libraries.

Yes, promise versions exist, sort of, except not always. And even though
you can do stuff like top-level await if you configure everything properly, that's kind of the issue. The default is not modern.

I mean, it can't be unless you want to break literally years of existing code, but I can't help but wonder how beginners feel when they either aren't aware of all this or have to type magic incantations to get clean code.

# NPM gripes

By the way, can we talk about how insanely many hoops you have to jump through
to just execute a TS file without precompiling and without a ton of garbage output
in stout?

ts-node the shell command is just useless for modern module style js,
`node --loader` is a big and scary warning and you end up with whatever this
unholy abomination is in package.json.

And don't forget to run npm --silent I guess, because even on the error log level you get the stupid echo at the start. Why is that not restricted to log level info i just beyond me.
