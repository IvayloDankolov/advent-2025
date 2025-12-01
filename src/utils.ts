import { stat } from "fs/promises";
import type { ExecException } from "node:child_process";

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
