import { executeDay } from "./day-runner.js";

const dayId = process.argv[2];

if (dayId === undefined) {
    console.error("Please provide a day ID as a command-line argument.");
    process.exit(1);
}

// Let's not include pwn vectors on principle even if this is a toy
if (!/^[a-zA-Z0-9]+$/.test(dayId)) {
    console.error(
        "Day ID must be alphanumeric only. No paths, extensions, or special characters allowed."
    );
    process.exit(1);
}

const childArgs = process.argv.slice(3);

await executeDay(dayId, childArgs);
