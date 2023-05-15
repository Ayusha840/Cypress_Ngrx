import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTokenGuard } from './guard/check-token.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>
    import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'',
    loadChildren:()=>
    import('./base/base.module').then(m=>m.BaseModule),
    canActivate:[CheckTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
