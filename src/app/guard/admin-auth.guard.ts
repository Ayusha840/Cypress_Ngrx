import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'
import { environment } from 'src/environment/environment';
import { CommonService } from '../services/common.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private _commonService:CommonService,private toster:ToastrService){}
  canActivate(){
    if (localStorage.getItem('loginToken')) {
      let token:any = localStorage.getItem('loginToken')
     let tokenData = this._commonService.getDecryptedItem(token)

      if(tokenData.role ==='admin'){
        
        return true
      }else{
        this.toster.error('Not Authorized!!!')
        return false;
      }
      
    }
    return false
    }
  
}
