import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { loginInterface } from "src/app/model/login.interface"
import { AppService } from "src/app/services/app.service"
import { CommonService } from "src/app/services/common.service"
import { environment } from "src/environment/environment"

 interface userRes{
    message: string,
    token:string
    res:loginInterface
}
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    submitted = false
    loginForm: FormGroup
    appConstant = environment;
    constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private toaster: ToastrService,
    private router: Router,
    private commonService: CommonService,
    ) {
        this.loginForm = fb.group({
            email: [
                "",
                [
                    Validators.required,
                    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
                ],
            ],
            password: ["", Validators.required],
        })
    }
    ngOnInit(): void {
        this.appConstant = environment
    }
    get f() {
        return this.loginForm.controls
    }
    submit(form: boolean) {
        this.submitted = true
        if (form) {

            this.appService
                .post("login", this.loginForm.value)
                .subscribe((result:userRes) => {
                    if (result) {
                        this.toaster.success(result.message)
                        const token = this.commonService.getEncryptedItem(result.res)              
                        localStorage.setItem("loginToken",token)
                        this.router.navigate([""])
                    }
                })
        } else {
            alert("Invalid credential!!!")
        }
    }
}
