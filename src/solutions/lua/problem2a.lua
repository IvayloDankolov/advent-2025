local digit_count = function(n)
    if n == 0 then
        return 1
    end
    return math.floor(math.log(n, 10)) + 1
end
-- Reminder, a tautological number is two twins in a trenchcoat.
local function next_tautological_index(N)
    local digits = digit_count(N)

    if digits % 2 == 1 then
        -- There are no odd tautological numbers obviously, so here we just jump up a tier.
        return 10 ^ (digits // 2)
    end

    local half_digits = digits // 2
    local halfMult = 10 ^ half_digits
    local halfN = N // halfMult

    local candidate = halfN * halfMult + halfN
    if candidate >= N then
        return halfN
    else
        -- This works even if we jump up a tier, since the next tautological number after e.g. 9999 is 100100
        -- It's nice that they're neatly ordered
        return halfN + 1
    end
end

local function tautological_nums_in_range(start_num, end_num)
    local indexStart = next_tautological_index(start_num)
    local indexEnd = next_tautological_index(end_num + 1)

    local resultList = {}
    for i = indexStart, indexEnd - 1 do
        local tautological_num = i * (10 ^ digit_count(i)) + i
        resultList[#resultList + 1] = tautological_num
    end
    return resultList
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
    local nums = tautological_nums_in_range(start_num, end_num)
    for _, v in ipairs(nums) do
        sum = sum + v
    end
end

print(string.format("Sum of all tautological numbers in ranges: %d", sum))
