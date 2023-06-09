import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";
import { loginDataInterface, loginInterface } from "../model/login.interface";

interface userRes {
  message: string;
  token: string;
  res: loginInterface;
}

@Injectable({
    providedIn: "root",
})
export class AppService {
    
    headers = new HttpHeaders();

    constructor(private http: HttpClient, private toasterService: ToastrService) {
        this.headers
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*");
    }

    post(url: string, req: loginDataInterface): Observable<userRes> {
        return this.http.post<userRes>(`${environment.APIUrl}/${url}`, req);
    }
}
