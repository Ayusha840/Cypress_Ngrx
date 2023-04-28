import { Component } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  addUserForm: FormGroup
  tab:string = '';
  selectedFiles: FileList | any;
  currentFileUpload: File | any;
  constructor(private fb: FormBuilder,    
    private _appService: AppService,
    ) {
    this.addUserForm = fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      avatar : new FormControl('')
    })
  }
  AdduserSubmit(form:boolean){
    console.log(form);
  }
  setFormData(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
        return;
    }
      const file = input.files[0];
      console.log(file);
      this._appService.uploadFile(file).subscribe((res)=>{
        console.log(res);
    }
    )
      
}
}
