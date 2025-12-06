import { mkdir } from "fs/promises";
import { TEMP_DIR } from "./constants.js";
import { Runner } from "./runner-helpers.js";
import languageRunners from "./runners.js";
import { dirExists, fileExists } from "./utils.js";

const problemPath = (dayId: string, language: string, ext: string): string => {
    return `./src/solutions/${language}/problem${dayId}.${ext}`;
};

async function findRunnerForDay(dayId: string): Promise<Runner> {
    for (const runner of Object.values(languageRunners)) {
        const sourcePath = problemPath(
            dayId,
            runner.subfolder,
            runner.fileExtension
        );
        if (await fileExists(sourcePath)) {
            return runner;
        }
    }
    throw new Error(`No runner found for Day ${dayId}`);
}

async function init() {
    if (!(await dirExists(TEMP_DIR))) {
        await mkdir(TEMP_DIR);
    }
}

// TODO: optional timing stress testing
export async function executeDay(dayId: string, args: string[] = []) {
    await init();

    const runner = await findRunnerForDay(dayId);

    const sourcePath = problemPath(
        dayId,
        runner.subfolder,
        runner.fileExtension
    );

    if (runner.setup) {
        const setupSuccess = await runner.setup(sourcePath);
        if (!setupSuccess) {
            console.error(`Setup failed for Day ${dayId}`);
            return;
        }
    }

    await runner.run(sourcePath, args);

    if (runner.teardown) {
        await runner.teardown(sourcePath);
    }
}
