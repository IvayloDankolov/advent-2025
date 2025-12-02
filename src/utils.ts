import { stat } from "fs/promises";
import { exec, type ExecException } from "node:child_process";

export function execPiped(command: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const child = exec(command);
        child.stdout?.pipe(process.stdout);
        child.stderr?.pipe(process.stderr);
        child.on("close", (code) => {
            resolve(code ?? 0);
        });
        child.on("error", (err) => {
            reject(err);
        });
    });
}

export function isExecError(e: unknown): e is ExecException & {
    stdout?: string | Buffer;
    stderr?: string | Buffer;
} {
    return e instanceof Error && "code" in e;
}

export async function fileExists(path: string): Promise<boolean> {
    try {
        const s = await stat(path);
        return s.isFile();
    } catch {
        return false;
    }
}

export async function dirExists(path: string): Promise<boolean> {
    try {
        const s = await stat(path);
        return s.isDirectory();
    } catch {
        return false;
    }
}
