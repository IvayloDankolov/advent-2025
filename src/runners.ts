import {
    defaultCompilerSetup,
    Runner,
    scriptExecutor,
} from "./runner-helpers.js";

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

        ...defaultCompilerSetup(
            (outDir: string, sourcePath: string) =>
                `go build -o ${outDir}/problem.out ${sourcePath}`
        ),
    },
} as const satisfies Record<string, Runner>;

export type Language = keyof typeof languageRunners;
export const ALL_LANGUAGES = Object.keys(languageRunners) as Language[];
export function getRunner(lang: Language): Runner {
    return languageRunners[lang];
}

export default languageRunners;
