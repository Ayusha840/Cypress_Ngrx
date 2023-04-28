import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavigationModule } from '../navigation/navigation.module';
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [
    LoginComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NavigationModule
  ]
})
export class AuthModule { }
