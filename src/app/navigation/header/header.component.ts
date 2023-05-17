import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { CommonService } from "src/app/services/common.service"

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    constructor(public router: Router, private commonService: CommonService) {}
    logToken = false
    ngOnInit(): void {
        this.logToken = this.commonService.getToken()
    }

    logOutFun() {
        localStorage.removeItem("loginToken")
        this.commonService.logToken.next(false)
        this.logToken = false;
        this.router.navigate(["/"])
    }
}
