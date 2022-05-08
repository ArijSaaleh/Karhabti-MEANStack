import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycarsComponent } from './cars/mycars/mycars.component';
import { RegisterComponent } from './register/register.component';
import { AddcarComponent } from './cars/addcar/addcar.component';
import { EditcarComponent } from './cars/editcar/editcar.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'mycars', component:MycarsComponent},
  {path:'addcar', component:AddcarComponent},
  {path:'editcar/:id', component:EditcarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
