import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BaseComponent } from './base/base.component'
import { UserComponent } from './users/user/user.component'
import { PostComponent } from './post/post.component'
import { ProductComponent } from './product/product.component'
import { AddUserComponent } from './users/add-user/add-user.component'

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path:'add-user',
        component:AddUserComponent
      },
      {
        path: 'post',
        component: PostComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
