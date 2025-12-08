(ns problem8b
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


(defn find-first-full-connector [edges num-vertices]
  (let [shortest-edges (->> edges
                            (sort-by :dist))
        initial-paints (vec (range num-vertices))]
    (loop [paints initial-paints
           [edge & remaining] shortest-edges]
      (let [new-paints (connect-edge paints edge)]
        (if (apply = new-paints)
          edge
          (recur new-paints remaining))))))

(defn connector-score [vertices connector]
  (let [edge-a (vertices (:a connector))
        edge-b (vertices (:b connector))]
    (* (first edge-a) (first edge-b))))


(when (not= (count *command-line-args*) 1)
  (println "Usage: <filename>")
  (System/exit 1))

(let [filename (first *command-line-args*)
      file (io/file filename)]
  (if (.exists file)
    (with-open [rdr (io/reader file)]
      (let [vertices (mapv parse-line (line-seq rdr))
            edges (distance-edges vertices)
            connector (find-first-full-connector edges (count vertices))
            score (connector-score vertices connector)]
        (println score)))
    (println (str "File not found: " filename))))