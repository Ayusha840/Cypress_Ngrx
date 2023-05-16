import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../services/common.service";
@Injectable({
    providedIn: "root",
})
export class AdminAuthGuard implements CanActivate {
    constructor(
    private commonService: CommonService,
    private toster: ToastrService,
    ) {}

    canActivate() {
        if (localStorage.getItem("loginToken")) {
            
            const token = localStorage.getItem("loginToken");
            const tokenData = this.commonService.getDecryptedItem(token);

            if (tokenData.role === "admin") {
                return true;
            } else {
                this.toster.error("Not Authorized!!!");
                return false;
            }
        }
        return false;
    }
}
