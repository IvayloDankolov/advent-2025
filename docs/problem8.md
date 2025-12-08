# Day 8

Dawn of the second week and it feels really great to be caught up. Let's spin our wheel...

<img src="roll8.jpg" alt="Wheel of fortune rolled Clojure" style="width:400px">

Great! I haven't done anything Lisp-adjacent recently so I may or may not go for something silly here.
It'll depend on the complexity of the problem, I guess. Speaking of that, let me get a quick runner ready so I can actually get to reading the task.

## First impressions

I sense a disturbance in the force, like millions of Redditors cried out and were suddenly silenced.

In all seriousness it could be worse. When it started talking about connecting all sorts of alarms were going up like travelling salesman, convex covers, etc.

At least for what part 1 is asking, it very much spells out a procedure that you absolutely have to follow basically to the letter.
Of course, you have to follow it efficiently, otherwise you might be sat there waiting for a while, but that's the fun of it after all.

Now anyone at all familiar with Graph theory should recognize how to do this efficiently fairly quickly. We can model this as a complete graph of n^2 nodes, with the edges being the distances between the 3d points and then basically turning it into a painting problem.

It's quite literally asking us to do the 1000 shortest edges in order, so we might as well oblige. Funnily enough the way it's pharsed it is possible for this to be ambigous and thus break the problem, if you have a group of equidistant points that spans the number 1000 distance. I'm just going assume they prevent this during input generation otherwise we'd be screwed anyway.

Note, if we just naively sort the entire list of edges, it's `O(n^2 * lgn)`. If you were to use a max heap instead and remove k items, it would be `O(n^2 + k lgn)`. In our case they seem to have chosen exactly the number of vertices, so that becomes `nlgn` and is entirely dominated by the `n^2`

We could actually do that here by dropping to a Java PriorityQueue. However, we'd have to implement a class with a comparator for that and while I mean sure Clojure has plenty of interoperability with other JVM libraries at that point I'm not following my own language roles at least in spirit.

Other things you could also do are quick select, but that has a terrible worst case, or k-th largest using partial merge sorts. The latter is not particularly pleasant to write especially the in place version.

Anyway, am I just dissembling so I justify not doing it in Clojure? Yeah I guess.

Hey, first try! The meat of it is basically gradually painting the shortest network:

```clojure
(defn connect-edge [vertex-paints edge]
  (let [{:keys [a b]} edge
        paint-a (get vertex-paints a)
        paint-b (get vertex-paints b)]
    (if (= paint-a paint-b)
      vertex-paints
      (mapv (fn [p]
              (if (= p paint-b)
                paint-a
                p))
            vertex-paints))))

(defn paint-shortest-network [edges num-vertices n]
  (let [shortest-edges (->> edges
                            (sort-by :dist)
                            (take n))
        initial-paints (vec (range num-vertices))]
    (reduce connect-edge initial-paints shortest-edges)))
```

We start with n networks labeled 0...(n-1) and each time we connect an edge `[a,b]` we wipe out `paint[b]` and replace it with `paint[a]` everywhere. Again this is quadratic as currently written. You could reduce this with some Sets and a more clever representation so re-keying a group is quicker, but I guess I'm committed to not over-complicating it at this point.

## Part 2 impressions

OK, again they could've asked us something a lot more evil in here, like what's the most you can connect this graph using a certain length of cable, which would have definitely made me sad on Monday after work.

Instead, it continues to be sort of spelled out for us in that we must follow this greedy procedure to the letter.

In theory you can reuse everything, though if the problem is particularly evil, like having 1 box a million units away, we jump up to an `O(n^3)` without optimisation which starts getting a tad scary.

I'm tired and I wanted my star so I didn't even bother expressing this functionally. We have a tail recursion loop built in and we'll bloody well use it.

I'll probably do a postmortem when I'm a bit more rested.
