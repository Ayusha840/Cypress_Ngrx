import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavigationModule } from "../navigation/navigation.module";
import { BaseRoutingModule } from "./base-routing.module";
import { BaseComponent } from "./base/base.component";
import { PostComponent } from "./post/post.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { ProductComponent } from "./product/product.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { UserComponent } from "./users/user/user.component";

@NgModule({
    declarations: [
        BaseComponent,
        UserComponent,
        PostComponent,
        ProductComponent,
        AddUserComponent,
        AddProductComponent,
    ],
    imports: [
        CommonModule,
        BaseRoutingModule,
        NavigationModule,
        ReactiveFormsModule,
        FormsModule,
    ],
})
export class BaseModule {}
