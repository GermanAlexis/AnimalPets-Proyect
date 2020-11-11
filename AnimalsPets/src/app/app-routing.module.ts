import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EditElephantComponent } from './pages/edit-elephant/edit-elephant.component';
import { ElephantComponent } from './pages/elephant/elephant.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login',   component: LoginComponent},
    { path: 'elephant', component: ElephantComponent },
    { path: 'editelephant', component: EditElephantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
