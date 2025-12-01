export interface Order {
    id: number,
    code: string,
    status: string,
    address:string,
    notes:string,
    ship:number,
    accountId:number,
    accountName:string
}