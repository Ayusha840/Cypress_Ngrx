import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationModule } from "../navigation/navigation.module";
import { BaseRoutingModule } from "./base-routing.module";
import { BaseComponent } from "./base/base.component";
import { EmployeeInfoComponent } from "./employee-info/employee-info.component";
import { PostComponent } from "./post/post.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { ProductComponent } from "./product/product.component";
import { AddUserComponent } from "./users/add-user/add-user.component";
import { UserComponent } from "./users/user/user.component";
import { ProjectDetailComponent } from './employee-info/project-detail/project-detail.component';
@NgModule({
    declarations: [
        BaseComponent,
        UserComponent,
        PostComponent,
        ProductComponent,
        AddUserComponent,
        AddProductComponent,
        EmployeeInfoComponent,
        ProjectDetailComponent,
    ],
    imports: [
        CommonModule,
        BaseRoutingModule,
        NavigationModule,
        ReactiveFormsModule,
        FormsModule,
        NgbDatepickerModule, NgbAlertModule
    ],
})
export class BaseModule {}
