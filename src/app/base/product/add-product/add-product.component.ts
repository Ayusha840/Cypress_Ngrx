import { Component } from "@angular/core"
import { FormBuilder, FormControl, FormGroup } from "@angular/forms"
import { BrandList } from "src/app/shareData/brandList"
import { CategoryList } from "src/app/shareData/categorylist"

@Component({
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent {
    productForm: FormGroup

    categoryList = CategoryList
    brandList = BrandList

    constructor(private fb: FormBuilder) {
        this.productForm = fb.group({
            title: new FormControl(""),
            category: new FormControl(""),
            brand: new FormControl(""),
            rating: new FormControl("3"),
            discountPercentage: new FormControl(""),
            price: new FormControl(""),
            description: new FormControl(""),
            stock: new FormControl(""),
        })
    }
}
