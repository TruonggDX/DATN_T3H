import {Image} from "./Image.ts";

export interface Product {
    id: number,
    code: string,
    name: string,
    sortDescription: string,
    description: string,
    categoryId: number,
    categoryName: string,
    brandId: number,
    brandName: string,
    imageDtos: Image[]
}