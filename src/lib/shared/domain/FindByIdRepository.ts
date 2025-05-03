export interface FindById{
    run(id: string): Promise<any>;
}