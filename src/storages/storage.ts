

interface IStorage<T> {
    set(value: T): Promise<void>;
    append(value: T): Promise<void>;
    get(): Promise<T>;
}