import System.Directory.Internal.Prelude (getArgs)

main = do
  args <- getArgs
  case args of
    [filename] -> do
      content <- readFile filename
      print content
    _ -> putStrLn "Usage: <filename>"