import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { AppService } from "src/app/services/app.service"

@Component({
    selector: "app-add-user",
    templateUrl: "./add-user.component.html",
    styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
    addUserForm: FormGroup
    tab = ""
    image = ""
    userID:any;
    constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
        this.addUserForm = fb.group({
            first_name: new FormControl("", Validators.required),
            last_name: new FormControl("", Validators.required),
            email: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            ]),
            avatar: new FormControl(""),
        })
    }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((item) => {
            if (item.id) {
                this.getDetail(item.id)
                this.userID = item.id;
            }
        })
    }
    getDetail(id: any) {
        this.appService.getDetail("user", id).subscribe((item: any) => {
            if (item) {
                this.addUserForm.setValue({
                    first_name: item.first_name,
                    last_name: item.last_name,
                    email: item.email,
                    avatar: item.avatar || "",
                })
            }
        })
    }
    AdduserSubmit(form: boolean) {
        if (form) {
            if(!this.userID){

                this.appService.post("user", this.addUserForm.value).subscribe((res) => {
                    if (res) {
                        this.router.navigate(["/user"])
                    }
                })
            }else{
                this.appService.put(`user/${this.userID}`, this.addUserForm.value).subscribe((res) => {
                    if (res) {
                        this.router.navigate(["/user"])
                    }
                })
            }
        }
    }
    onChange(event: any) {
        const reader = new FileReader()
        const input = event.target as HTMLInputElement
        if (!input.files?.length) {
            return
        }
        const file = input.files[0]
        this.appService.uploadFile(file).subscribe((res: any) => {
            this.addUserForm.patchValue({
                avatar: res.image,
            })
        })
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.image = reader.result as string
            }
        }
    }
}
