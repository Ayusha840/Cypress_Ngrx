export interface productInterface{
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