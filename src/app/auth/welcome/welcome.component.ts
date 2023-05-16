import { Component, OnInit } from "@angular/core";
import { loginInterface } from "src/app/model/login.interface";
import { CommonService } from "src/app/services/common.service";

@Component({
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {

    constructor(
    private commonService:CommonService
    ){}
    localData:loginInterface | undefined;
    ngOnInit(): void {
        this.localData =   this.commonService.getDecryptedItem(localStorage.getItem("loginToken"))  }

}
