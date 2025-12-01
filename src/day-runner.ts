import { mkdir } from "fs/promises";
import { TEMP_DIR } from "./constants.js";
import languageRunners, { Runner } from "./runners.js";
import { dirExists, fileExists } from "./utils.js";

const problemPath = (
    dayNumber: number,
    language: string,
    ext: string
): string => {
    return `./src/solutions/${language}/problem${dayNumber}.${ext}`;
};

async function findRunnerForDay(dayNumber: number): Promise<Runner> {
    for (const runner of Object.values(languageRunners)) {
        const sourcePath = problemPath(
            dayNumber,
            runner.subfolder,
            runner.fileExtension
        );
        if (await fileExists(sourcePath)) {
            return runner;
        }
    }
    throw new Error(`No runner found for Day ${dayNumber}`);
}

async function init() {
    if (!(await dirExists(TEMP_DIR))) {
        await mkdir(TEMP_DIR);
    }
}

// TODO: optional timing stress testing
export async function executeDay(dayNumber: number) {
    await init();

    const runner = await findRunnerForDay(dayNumber);

    const sourcePath = problemPath(
        dayNumber,
        runner.subfolder,
        runner.fileExtension
    );

    if (runner.setup) {
        const setupSuccess = await runner.setup(sourcePath);
        if (!setupSuccess) {
            console.error(`Setup failed for Day ${dayNumber}`);
            return;
        }
    }

    const output = await runner.run(sourcePath, []);

    console.log(output);

    if (runner.teardown) {
        await runner.teardown(sourcePath);
    }
}
