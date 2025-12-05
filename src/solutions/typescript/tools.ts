// Generator tools
export namespace Gen {
    export function* filter<T>(
        iter: Iterable<T>,
        predicate: (item: T) => boolean
    ): Generator<T> {
        for (const item of iter) {
            if (predicate(item)) {
                yield item;
            }
        }
    }
}

// Iterator tools
export namespace It {
    export function count<T>(iter: Iterable<T>): number {
        let count = 0;
        for (const _ of iter) {
            count++;
        }
        return count;
    }
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
