import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";
import { productInterface } from "../model/product.interface";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    headers= new HttpHeaders();
        
    constructor(private http: HttpClient, private toasterService: ToastrService) {
        this.headers
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*")
    }
    get(url: string): Observable<productInterface[]> {
        return this.http.get<productInterface[]>(`${environment.APIUrl}/${url}`);
    }
}
