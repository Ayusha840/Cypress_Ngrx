export interface productInterface{
    [key: string]: string | number | undefined | string[] | Array<[]>;
    _id:string;
    title:string;
    description:string;
    price:number;
    discountPercentage:string;
    rating:string;
    stock:number;
    brand:string;
    category:string;
    thumbnail?:string;
    images?:Array<string>;
    __v?:number    
}