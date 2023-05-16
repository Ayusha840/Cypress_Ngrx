import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";
import { delUserInterface } from "../model/delUser.interface";
import { imageInterface } from "../model/image.interface";
import { userInterface } from "../model/user.interface";
@Injectable({
    providedIn: "root",
})
export class UserService {
    headers = new HttpHeaders();

    constructor(private http: HttpClient, private toasterService: ToastrService) {
        this.headers
            .set("content-type", "application/json")
            .set("Access-Control-Allow-Origin", "*");
    }

    delete(url: string, id: string|undefined): Observable<delUserInterface> {
        return this.http.delete<delUserInterface>(`${environment.APIUrl}/${url}/${id}`);
    }
    post(url: string, req: userInterface) {
        return this.http.post(`${environment.APIUrl}/${url}`, req);
    }
    put(url: string, req: userInterface) {
        return this.http.put(`${environment.APIUrl}/${url}`, req);
    }
    uploadFile(file: File):Observable<imageInterface> {
        const formData = new FormData();
        formData.append("file", file, file.name);
        return this.http.post<imageInterface>(`${environment.APIUrl}/upload-image`, formData);
    }
   
    get(url: string): Observable<userInterface[]> {
        return this.http.get<userInterface[]>(`${environment.APIUrl}/${url}`);
    }
    getDetail(url: string, param: string ) {
        return this.http.get(`${environment.APIUrl}/${url}/${param}`);
    }
}
