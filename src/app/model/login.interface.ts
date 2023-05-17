export interface loginInterface {
    _id:string;
    businessName:string;
    name:string;
    email:string;
    password:string;
    role:string;
    status:string;
    __v?:number;

}

export interface loginDataInterface{
    email:string;
    password:string
}