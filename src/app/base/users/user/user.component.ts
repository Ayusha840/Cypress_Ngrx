import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AppService } from 'src/app/services/app.service'
import { environment } from 'src/environment/environment'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private _service: AppService, public router: Router) {}
  userList: any
  appConstant: any
  ngOnInit(): void {
    this.appConstant = environment
    this.getUserList()
  }

  getUserList() {
    this._service.get('user').subscribe((res: any) => {
      this.userList = res
    })
  }
  deleteUser(id: any) {
    this._service.deleteUser('user', id).subscribe(
      (res) => {
        this.userList = this.userList.filter((el: any) => el._id !== id)
      },
      (err) => {},
    )
  }
  
  userDetail(id: any) {
    this.router.navigate([`update-user/${id}`])
  }
}
