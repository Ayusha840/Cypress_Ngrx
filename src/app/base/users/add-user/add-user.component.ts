import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { imageInterface } from "src/app/model/image.interface"
import { userInterface } from "src/app/model/user.interface"
import { UserService } from "src/app/services/user.service"

@Component({
    selector: "app-add-user",
    templateUrl: "./add-user.component.html",
    styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
    addUserForm: FormGroup
    tab = ""
    image = ""
    userID="";
    constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
        this.addUserForm = fb.group({
            "first_name": new FormControl("", Validators.required),
            "last_name": new FormControl("", Validators.required),
            "email": new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            ]),
            "avatar": new FormControl(""),
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
    getDetail(id: string) {
        this.userService.getDetail("user", id).subscribe((item: userInterface) => {
            if (item) {
                this.addUserForm.setValue({
                    "first_name": item.first_name,
                    "last_name": item.last_name,
                    "email": item.email,
                    "avatar": item.avatar || "",
                })
            }
        })
    }
    AdduserSubmit(form: boolean) {
        if (form) {
            if(!this.userID){

                this.userService.post("user", this.addUserForm.value).subscribe((res) => {
                    if (res) {
                        this.router.navigate(["/user"])
                    }
                })
            }else{
                this.userService.put(`user/${this.userID}`, this.addUserForm.value).subscribe((res) => {
                    if (res) {
                        this.router.navigate(["/user"])
                    }
                })
            }
        }
    }
    onChange(event: Event) {
        const reader = new FileReader()
        const input = event.target as HTMLInputElement
        if (!input.files?.length) {
            return
        }
        const file = input.files[0]
        this.userService.uploadFile(file).subscribe((res: imageInterface) => {
            this.addUserForm.patchValue({
                avatar: res.image,
            })
        })
        if (input.files && input.files.length) {
            const file = input.files[0]
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.image = reader.result as string
            }
        }
    }
}
