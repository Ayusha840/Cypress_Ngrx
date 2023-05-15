import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { AppService } from "src/app/services/app.service"
import { environment } from "src/environment/environment"

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    constructor(private service: AppService, public router: Router) {}
    userList: any
    appConstant: any
    ngOnInit(): void {
        this.appConstant = environment
        this.getUserList()
    }

    getUserList() {
        this.service.get("user").subscribe((res: any) => {
            this.userList = res
        })
    }
    deleteUser(id: any) {
        this.service.deleteUser("user", id).subscribe(
            (res) => {
                // eslint-disable-next-line no-underscore-dangle
                this.userList = this.userList.filter((el: any) => el._id !== id)
            },
            (err) => {},
        )
    }
  
    userDetail(id: any) {
        this.router.navigate([`update-user/${id}`])
    }
}
