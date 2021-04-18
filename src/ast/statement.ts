export interface Statement {
    execute(): Promise<void>;
}