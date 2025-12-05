// Iterator tools
export namespace It {
    export function countIf<T>(
        iter: Iterable<T>,
        predicate: (item: T) => boolean
    ): number {
        let count = 0;
        for (const item of iter) {
            if (predicate(item)) {
                count++;
            }
        }
        return count;
    }
}
