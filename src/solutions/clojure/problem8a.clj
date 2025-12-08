(ns problem8a
  (:require [clojure.java.io :as io]))

(defn parse-line [line]
  (println line))

(when (empty? *command-line-args*)
  (println "No input provided")
  (System/exit 1))

(let [filename (first *command-line-args*)
      file (io/file filename)]
  (if (.exists file)
    (with-open [rdr (io/reader file)]
      (doseq [line (line-seq rdr)]
        (parse-line line)))
    (println (str "File not found: " filename))))