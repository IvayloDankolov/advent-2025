import child from "child_process";
import { unlink } from "fs/promises";
import path from "path";
import { promisify } from "util";
import { TEMP_DIR } from "./constants.js";
import { execPiped, isExecError } from "./utils.js";

const exec = promisify(child.exec);

export const DEFAULT_TMP_BINARY_NAME = path.join(TEMP_DIR, "problem.out");

export type Runner = {
    subfolder: string;
    fileExtension: string;

    setup?: (sourcePath: string) => Promise<boolean>;
    run: (sourcePath: string, args: string[]) => Promise<void>;
    teardown?: (sourcePath: string) => Promise<void>;
};

export const compilerExecutor = (
    compilerCommand: (outDir: string, sourcePath: string) => string
) => {
    return async (sourcePath: string) => {
        try {
            await exec(compilerCommand(TEMP_DIR, sourcePath));
            return true;
        } catch (e) {
            if (isExecError(e)) {
                console.error("Compilation error:", e.stderr?.toString());
                return false;
            } else {
                throw e;
            }
        }
    };
};
export const compiledBinaryExecutor = (binaryPath: string) => {
    return async (_sourcePath: string, args: string[]) => {
        const code = await execPiped(`${binaryPath} ${args.join(" ")}`);
        if (code != 0) {
            throw new Error(`Execution failed with code ${code}`);
        }
    };
};

export const defaultDeleter = async () => {
    await unlink(DEFAULT_TMP_BINARY_NAME);
};
export const defaultCompilerSetup = (
    compilerCommand: (outDir: string, sourcePath: string) => string
) => {
    return {
        setup: compilerExecutor(compilerCommand),
        run: compiledBinaryExecutor(DEFAULT_TMP_BINARY_NAME),
        teardown: defaultDeleter,
    };
};
export const scriptExecutor = (interpreterCommand: string) => {
    return async (sourcePath: string, args: string[]) => {
        const code = await execPiped(
            `${interpreterCommand} ${sourcePath} ${args.join(" ")}`
        );
        if (code != 0) {
            throw new Error(`Execution failed with code ${code}`);
        }
    };
};
