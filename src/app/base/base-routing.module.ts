import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAuthGuard } from "../guard/admin-auth.guard";
import { BaseComponent } from "./base/base.component";
import { EmployeeInfoComponent } from "./employee-info/employee-info.component";
import { PostComponent } from "./post/post.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { ProductComponent } from "./product/product.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { UserComponent } from "./users/user/user.component";

const routes: Routes = [
    {
        path: "",
        component: BaseComponent,
        children: [
            {
                path: "user",
                component: UserComponent,
                canActivate: [AdminAuthGuard],
            },
            {
                path: "add-user",
                component: AddUserComponent,
                canActivate: [AdminAuthGuard],
            },
            {
                path: "update-user/:id",
                component: AddUserComponent,
                canActivate: [AdminAuthGuard],
            },
            {
                path: "post",
                component: PostComponent,
            },
            {
                path: "product",
                component: ProductComponent,
            },
            {
                path: "add-product",
                component: AddProductComponent,
            },
            {
                path:"employee-info",
                component:EmployeeInfoComponent
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BaseRoutingModule {}
