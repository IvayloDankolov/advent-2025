local filename = arg[1]

if not filename then
    print("Usage: lua problem2a.lua <filename>")
    os.exit(1)
end

-- Read file contents
local file = io.open(filename, "r")
if not file then
    print("Error: Could not open file " .. filename)
    os.exit(1)
end

local content = file:read("l")
file:close()

-- Process content here
print(content)
