import { Injectable } from '@angular/core'
import * as CryptoJS from 'crypto-js'
import { environment } from '../../environment/environment'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
logToken = new Subject();
  getDecryptedItem(data: any) {
   if(data){
    let bcrypt = CryptoJS.AES.decrypt(
      data
        .replace('xMl3Jk', '+')
        .replace('Por21Ld', '/')
        .replace('Ml32', '=')
        .replace('xMl3Jk', '+')
        .replace('Por21Ld', '/')
        .replace('Ml32', '=')
        .replace('xMl3Jk', '+')
        .replace('Por21Ld', '/')
        .replace('Ml32', '='),
      environment.S_KEY,
    )
    if (bcrypt.toString()) {
      return JSON.parse(bcrypt.toString(CryptoJS.enc.Utf8))
    }
    return data 
   }
   return false;
   }

  getEncryptedItem(data: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), environment.S_KEY)
      .toString()
      .replace('+', 'xMl3Jk')
      .replace('/', 'Por21Ld')
      .replace('=', 'Ml32')
      .replace('+', 'xMl3Jk')
      .replace('/', 'Por21Ld')
      .replace('=', 'Ml32')
      .replace('+', 'xMl3Jk')
      .replace('/', 'Por21Ld')
      .replace('=', 'Ml32')
  }
  getToken(){
    if (localStorage.getItem('loginToken')) {
      return true
    }
    return false;
  }
 
}
