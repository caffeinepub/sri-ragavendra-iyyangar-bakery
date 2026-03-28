import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    name: string;
    description: string;
}
export interface Bakery {
    categories: Array<Category>;
    name: string;
    address: string;
}
export interface backendInterface {
    addCategory(bakeryName: string, categoryName: string, description: string): Promise<void>;
    createBakery(name: string, address: string): Promise<void>;
    getBakery(name: string): Promise<Bakery>;
    listBakeries(): Promise<Array<Bakery>>;
}
