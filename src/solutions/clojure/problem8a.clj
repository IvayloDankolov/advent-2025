(ns problem8a
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(defn distance [p1 p2]
  (Math/sqrt (reduce + (map (fn [a b] (Math/pow (- a b) 2)) p1 p2))))

(defn distance-edges [points]
  (for [i (range (count points))
        j (range (inc i) (count points))]
    {:a i
     :b j
     :dist (distance (nth points i) (nth points j))}))

(defn parse-line [line]
  (mapv #(Integer/parseInt %) (str/split line #",")))


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

(defn group-counts [painted-vertices]
  (reduce (fn [acc paint]
            (update acc paint (fnil inc 0)))
          {}
          painted-vertices))

(defn n-largest-multiplier [counts n]
  (->> counts
       vals
       (sort >)
       (take n)
       (reduce * 1)))


(when (not= (count *command-line-args*) 2)
  (println "Usage: <filename> <count>")
  (System/exit 1))

(let [filename (first *command-line-args*)
      n (Integer/parseInt (second *command-line-args*))
      file (io/file filename)]
  (if (.exists file)
    (with-open [rdr (io/reader file)]
      (let [vertices (mapv parse-line (line-seq rdr))
            edges (distance-edges vertices)
            network (paint-shortest-network edges (count vertices) n)
            counts (group-counts network)]
        (println (n-largest-multiplier counts 3))))
    (println (str "File not found: " filename))))