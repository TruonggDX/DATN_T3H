export interface Variant {
    id: number,
    code: string,
    price: number,
    quantity: number,
    discount: number,
    productId: number,
    attributeValuesId: number[],
}
