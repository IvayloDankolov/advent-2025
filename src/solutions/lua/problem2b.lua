local digit_count = function(n)
    if n == 0 then
        return 1
    end
    return math.floor(math.log(n, 10)) + 1
end

local function repeat_number(n, times)
    local result = 0
    local digits = digit_count(n)
    local mult = 10 ^ digits

    for i = 0, times - 1 do
        result = result * mult + n
    end

    return result
end


-- This will comput the function we defined in the notes
-- The set of all tautological numbers with a repeating base of n digits that are k digits long
local function TN(n, k)
    local res = {}
    if k <= n or k % n ~= 0 then
        return {}
    end

    local repeatCount = k // n
    local first = 10 ^ (n - 1)
    local last = 10 ^ n - 1
    for i = first, last do
        local num = repeat_number(i, repeatCount)
        res[num] = true
    end
    return res
end

local function compute_ranges(input)
    local ranges = {}
    for chunk in input:gmatch("[^,]+") do
        local start_num, end_num = chunk:match("(%d+)-(%d+)")
        chunk = { tonumber(start_num), tonumber(end_num) }
        table.insert(ranges, chunk)
    end
    return ranges
end



local DIGIT_LIMIT = 10
local totalTNCount = 0
local tnSet = {}

for n = 1, DIGIT_LIMIT // 2 do
    for k = n * 2, DIGIT_LIMIT, n do
        local tn_set = TN(n, k)
        for num, _ in pairs(tn_set) do
            tnSet[num] = true
            totalTNCount = totalTNCount + 1
        end
    end
end

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

local data = file:read("*all")
file:close()

local ranges = compute_ranges(data)

local sum = 0
for _, range in ipairs(ranges) do
    local start_num = range[1]
    local end_num = range[2]
    local length = end_num - start_num + 1
    if length < totalTNCount then
        -- easier to iterate through the range
        for num = start_num, end_num do
            if tnSet[num] then
                sum = sum + num
            end
        end
    else
        -- easier to iterate through the set instead
        for tn_num, _ in pairs(tnSet) do
            if tn_num >= start_num and tn_num <= end_num then
                sum = sum + tn_num
            end
        end
    end
end

print(string.format("Sum of all tautological numbers in ranges: %d", sum))
