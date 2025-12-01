# NPM gripes

By the way, can we talk about how insanely many hoops you have to jump through
to just execute a TS file without precompiling and without a ton of garbage output
in stout?

ts-node the shell command is just useless for modern module style js, 
`node --loader` is a big and scary warning and you end up with whatever this
unholy abomination is in package.json.

And don't forget to run npm --silent I guess, because even on the error log level you get the stupid echo at the start. Why is that not restricted to log level info i just beyond me.