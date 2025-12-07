import path from "path";
import {
    compilerExecutor,
    DEFAULT_TMP_BINARY_NAME,
    defaultCompilerSetup,
    defaultDeleter,
    Runner,
    scriptExecutor,
} from "./runner-helpers.js";
import { execPiped } from "./utils.js";

const languageRunners = {
    cpp: {
        subfolder: "cpp",
        fileExtension: "cpp",

        ...defaultCompilerSetup(
            (outDir: string, sourcePath: string) =>
                `clang++ --std=c++23 -o ${outDir}/problem.out ${sourcePath}`
        ),
    },
    lua: {
        subfolder: "lua",
        fileExtension: "lua",
        run: scriptExecutor("lua"),
    },
    swift: {
        subfolder: "swift",
        fileExtension: "swift",

        ...defaultCompilerSetup(
            (outDir: string, sourcePath: string) =>
                `swiftc -o ${outDir}/problem.out ${sourcePath}`
        ),
    },
    typescript: {
        subfolder: "typescript",
        fileExtension: "ts",
        run: scriptExecutor("npx ts-node"),
    },
    go: {
        subfolder: "go",
        fileExtension: "go",

        // Since go is a whiny bitch about packages and there's no possible way to
        // either have 2 mains in the same package or 2 mains in different packages
        // if the files are in the same folder, we have to get creative
        setup: compilerExecutor((_outDir: string, sourcePath: string) => {
            const containingFolder = path.dirname(sourcePath);
            const outFileAbsolute = path.resolve(DEFAULT_TMP_BINARY_NAME);
            return `cd ${containingFolder} && go build -o ${outFileAbsolute}`;
        }),
        run: async (sourcePath: string, args: string[]) => {
            const binaryPath = DEFAULT_TMP_BINARY_NAME;
            const code = await execPiped(
                `${binaryPath} ${sourcePath} ${args.join(" ")}`
            );
            if (code != 0) {
                throw new Error(`Execution failed with code ${code}`);
            }
        },
        teardown: defaultDeleter,
    },
    kotlinScript: {
        subfolder: "kotlin",
        fileExtension: "kts",
        run: scriptExecutor("kotlinc -script"),
    },
} as const satisfies Record<string, Runner>;

export type Language = keyof typeof languageRunners;
export const ALL_LANGUAGES = Object.keys(languageRunners) as Language[];
export function getRunner(lang: Language): Runner {
    return languageRunners[lang];
}

export default languageRunners;
