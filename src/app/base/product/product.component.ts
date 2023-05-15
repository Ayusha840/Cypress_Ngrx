import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from "@angular/core"
import { Router } from "@angular/router"
import { fromEvent } from "rxjs"
import { AppService } from "src/app/services/app.service"
import { CommonService } from "src/app/services/common.service"

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, AfterViewInit {
    constructor(
    private service: AppService,
    public router: Router,
    public commonService: CommonService,
    ) {}
    filterType = ["title", "category", "brand", "rating"]
    productList: any
    localList: any
    type = "title"
    logData: any
  @ViewChild("filter") filter!: ElementRef
  ngOnInit(): void {
      this.logData = this.commonService.getDecryptedItem(
          localStorage.getItem("loginToken"),
      )

      this.getProductList()
  }
  getProductList() {
      this.service.get("product").subscribe((item) => {
          this.productList = this.localList = item
      })
  }
  changeFilter(event: any) {
      this.type = event.target.value
      this.productList = this.localList
  }
  ngAfterViewInit(): void {
      const text = fromEvent(this.filter.nativeElement, "keyup")
      text.subscribe((item: any) => {
          if (item.target.value) {
              this.productList = this.localList.filter(
                  (el: any) =>
                      el[this.type].toLowerCase().indexOf(item.target.value) > -1,
              )
          } else {
              this.productList = this.localList
          }
      })
  }
}
