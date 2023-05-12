import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
    constructor(
        private service: AppService,
        public router: Router
    ){}              
    userList: any;
    ngOnInit(): void {
        this.getUserList();
    }
    getUserList() {
        this.service.getUserList().subscribe((res) => {
            this.userList = res.data;
        });
    }
    
    deleteUser(id: any) {
        this.service.deleteUser(id).subscribe(
            (res) => {
                this.userList = this.userList.filter((el: any) => el.id !== id);
            },
            (err) => {
                console.log(err);
            },
        );
    }
}
