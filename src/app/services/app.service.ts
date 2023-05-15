// import { Injectable } from '@angular/core';
// import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
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
  headers:any;
  constructor(
    private http: HttpClient,
    private toasterService: ToastrService,
  ) {

    this.headers = new Headers({
     'Content-Type': 'application/json'
   });

  }

  getUserList(): Observable<any> {
    return this.http.get('https://reqres.in/api/users?page=1',this.headers)
  }
  deleteUser(url: string, id: any): Observable<any> {
    return this.http.delete(`${environment.APIUrl}/${url}/${id}`).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )  }
  post(url: string, req: any) {
    return this.http.post(`${environment.APIUrl}/${url}`, req).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }
  put(url: string, req: any) {
    return this.http.put(`${environment.APIUrl}/${url}`, req).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }
  uploadFile(file: any) {
    let formData = new FormData()
    formData.append('file', file, file.name)
    return this.http.post(`${environment.APIUrl}/upload-image`, formData)
  }
  patch(url: string, req: any) {
    return this.http.patch(`${environment.APIUrl}/${url}/${req._id}`, req).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }
  get(url: string) {
    return this.http.get(`${environment.APIUrl}/${url}`).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }
  getDetail(url: string,param:any) {
    return this.http.get(`${environment.APIUrl}/${url}/${param}`).pipe(
      catchError((error) => {
        this.handleError(error)
        return ''
      }),
    )
  }
  private handleError(err: HttpErrorResponse) {
    let errMsg = ''
    if (err.error instanceof ErrorEvent) {
      errMsg = `Error: ${err.message}`
    } else {
      errMsg = `Error Code: ${err.status} , Message: ${err.message}`
    }
    this.toasterService.error(err.error.message)
    return errMsg
  }
}
