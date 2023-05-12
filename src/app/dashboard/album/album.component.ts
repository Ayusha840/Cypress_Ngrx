import { Component } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  lists:any[] = [];

  constructor(
    // private _commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    // this._commonService.getList('albums').subscribe((response:any)=>{
    //   if(response){
    //     this.lists = response;
    //   }
    // })

    // console.error("this is an error")
  }
}
