import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { loginInterface } from "src/app/model/login.interface";
import { productInterface } from "src/app/model/product.interface";
import { CommonService } from "src/app/services/common.service";
import { ProductService } from "./../../services/product.service";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, AfterViewInit {
    constructor(
    public router: Router,
    public commonService: CommonService,
    private productService: ProductService,
    ) {}

    filterType = ["title", "category", "brand", "rating"];
    productList: productInterface[] = [];
    localList: productInterface[] = [];
    type = "title";
    logData!: loginInterface;

  @ViewChild("filter") filter!: ElementRef;

  ngOnInit(): void {
      this.logData = this.commonService.getDecryptedItem(
          localStorage.getItem("loginToken"),
      );
      this.getProductList();
  }

  getProductList() {
      this.productService.get("product").subscribe((item: productInterface[]) => {
          this.productList = this.localList = item;
      });
  }

  changeFilter(event: Event) {
      this.type = (event.target as HTMLInputElement).value;
      this.productList = this.localList;
  }

  ngAfterViewInit(): void {
      const text = fromEvent<KeyboardEvent>(this.filter.nativeElement, "keyup");

      text.subscribe((item: KeyboardEvent) => {
          const text = item.target as HTMLInputElement;
          if (text.value) {
              this.productList = this.localList.filter((el: productInterface) => {
                  const propertyValue = el[this.type];
                  if (typeof propertyValue === "string") {
                      return propertyValue.toLowerCase().indexOf(text.value.toLowerCase()) > -1;
                  }
                  return false;
              }) as productInterface[];
          } else {
              this.productList = this.localList;
          }
      });
  }
}
