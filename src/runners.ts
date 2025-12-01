import child from "child_process";
import { unlink } from "fs/promises";
import { promisify } from "util";
import { TEMP_DIR } from "./constants.js";
import { isExecError } from "./utils.js";

const exec = promisify(child.exec);

export type Runner = {
    subfolder: string;
    fileExtension: string;

    setup?: (sourcePath: string) => Promise<boolean>;
    run: (sourcePath: string, args: string[]) => Promise<string>;
    teardown?: (sourcePath: string) => Promise<void>;
};

const languageRunners = {
    cpp: {
        subfolder: "cpp",
        fileExtension: "cpp",

        setup: async (sourcePath: string) => {
            try {
                await exec(
                    `clang++ --std=c++23 -o ${TEMP_DIR}/problem.out ${sourcePath}`
                );
                return true;
            } catch (e) {
                if (isExecError(e)) {
                    console.error("Compilation error:", e.stderr?.toString());
                    return false;
                } else {
                    throw e;
                }
            }
        },
        run: async (_sourcePath: string, args: string[]) => {
            try {
                const { stdout } = await exec(
                    `${TEMP_DIR}/problem.out ${args.join(" ")}`
                );
                return stdout;
            } catch (e) {
                if (isExecError(e)) {
                    console.error("Execution error:", e.stderr?.toString());
                    return "";
                } else {
                    throw e;
                }
            }
        },
        teardown: async (_sourcePath: string) => {
            await unlink(`${TEMP_DIR}/problem.out`);
        },
    },
} as const satisfies Record<string, Runner>;

export type Language = keyof typeof languageRunners;
export const ALL_LANGUAGES = Object.keys(languageRunners) as Language[];
export function getRunner(lang: Language): Runner {
    return languageRunners[lang];
}

export default languageRunners;
