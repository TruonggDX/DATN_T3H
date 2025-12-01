import {Image} from "./Image.ts";

export interface ProductDto {
    id: number;
    code: string;
    name: string;
    sortDescription: string;
    description: string;
    categoryId: number;
    brandId: number;
    imageDtos: Image[];
}
