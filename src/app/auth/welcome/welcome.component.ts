import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _commonService:CommonService
  ){}
  localData:any;
  ngOnInit(): void {
  this.localData =   this._commonService.getDecryptedItem(localStorage.getItem('loginToken'))  }

}
