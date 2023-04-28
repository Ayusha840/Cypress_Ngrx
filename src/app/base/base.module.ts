import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms'
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base/base.component';
import { NavigationModule } from '../navigation/navigation.module';
import { UserComponent } from './users/user/user.component';
import { PostComponent } from './post/post.component';
import { ProductComponent } from './product/product.component';
import { AddUserComponent } from './users/add-user/add-user.component';


@NgModule({
  declarations: [
    BaseComponent,
    UserComponent,
    PostComponent,
    ProductComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    NavigationModule,
    ReactiveFormsModule
  ]
})
export class BaseModule { }
