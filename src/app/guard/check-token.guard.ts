import { Injectable } from "@angular/core"
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { Observable } from "rxjs"

@Injectable({
    providedIn: "root",
})
export class CheckTokenGuard implements CanActivate {
    constructor(private toster:ToastrService){}
    canActivate() {
        if (localStorage.getItem("loginToken")) {
            return true
        }
        this.toster.error("Please login!!!")
        return false
    }
}
