import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { AppService } from "src/app/services/app.service"
import { CommonService } from "src/app/services/common.service"
import { environment } from "src/environment/environment"
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    submitted = false
    loginForm: FormGroup
    appConstant: any
    constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private toaster: ToastrService,
    private router: Router,
    private commonService:CommonService
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
                .subscribe((userRes: any) => {
                    if (userRes) {
                        this.toaster.success(userRes.message)

                        const token = this.commonService.getEncryptedItem(userRes.res)              
                        localStorage.setItem("loginToken",token)

                        // if (userRes.res.role === 'suppport') {
                        //   this.router.navigate(['/post'])
                        // }
                        // if (userRes.res.role === 'admin') {
                        this.router.navigate([""])
                        // }
                    }
                })
        } else {
            alert("Invalid credential!!!")
        }
    }
}
