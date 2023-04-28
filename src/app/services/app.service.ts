// import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class AppService {

//   constructor(private http:HttpClient) { }

//   getUserList() :Observable<any>{
//     return this.http.get('https://reqres.in/api/users?page=1')
//   }
//   deleteUser(id:number):Observable<any>{
//     return this.http.delete(`https://reqres.in/api/users/${id}`)
//   }
// }


//-------------------
import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environment/environment'
import { catchError, throwError } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    private toasterService: ToastrService,
  ) {}

    getUserList() :Observable<any>{
    return this.http.get('https://reqres.in/api/users?page=1')
  }
  deleteUser(id:number):Observable<any>{
    return this.http.delete(`https://reqres.in/api/users/${id}`)
  }
  post(url: string, req: any) {
    console.log(req);
    
    return this.http.post(`${environment.APIUrl}/${url}`, req).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }

  uploadFile(req:any){
    console.log(req);
    let formData = new FormData();
    formData.append('file', req, req.name) 
    
return this.http.post(`${environment.APIUrl}/upload-image`,formData)
  }
  patch(url: string, req: any) {
    return this.http.patch(`${environment.APIUrl}/${url}/${req._id}`, req).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }
  get(url:string, req:string){
    return this.http.get(`${environment.APIUrl}/${url}/${req}`).pipe(
      catchError((error)=>{
        this.handleError(error)
        return ''
      })
    )
  }
  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof ErrorEvent) {
      errMsg = `Error: ${err.message}`
    } else {
      errMsg = `Error Code: ${err.status} , Message: ${err.message}`
      console.log('222',err.message)

    }
    this.toasterService.error(err.error.message)
  }
}
