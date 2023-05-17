import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { userInterface } from "src/app/model/user.interface";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environment/environment";
@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    constructor(private service: UserService, public router: Router) {}
    userList: userInterface[] = [];
    appConstant = environment;
    ngOnInit(): void {
        this.appConstant = environment;
        this.getUserList();
    }

    getUserList() {
        this.service.get("user").subscribe((res: userInterface[]) => {
            this.userList = res;
        });
    }
    deleteUser(id: string | undefined) {
        this.service.delete("user", id).subscribe(() => {
            this.userList = this.userList.filter(
                (el: userInterface) => el["_id"] !== id,
            );
        });
    }

    userDetail(id: string | undefined) {
        this.router.navigate([`update-user/${id}`]);
    }
}
