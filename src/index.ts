import { executeDay } from "./day-runner.js";

const day = parseInt(process.argv[2] ?? "-1", 10);
if (isNaN(day) || day < 1 || !Number.isInteger(day)) {
    console.error("Porblem id must be a positive integer.");
    process.exit(1);
}

await executeDay(day);
