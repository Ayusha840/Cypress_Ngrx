import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AppService } from 'src/app/services/app.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: boolean = false
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private _appService: AppService,
    private _toaster: ToastrService,
    private router : Router,
  ) {
    this.loginForm = fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {}
  get f() {
    return this.loginForm.controls
  }
  submit(form:boolean) {
    this.submitted = true
    if (form) {
      this._appService
        .post('login', this.loginForm.value)
        .subscribe((userRes: any) => {
          if (userRes) {
            this._toaster.success(userRes.message)
        this.router.navigate(['/user'])      
          }
        })
    } else{
      alert('Invalid credential!!!')
    }
  }
}
