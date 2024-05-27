import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MedicosListComponent } from './components/medicos/medicos-list/medicos-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MedicoCreateComponent } from './components/medicos/medico-create/medico-create.component';
import { MedicoUpdateComponent } from './components/medicos/medico-update/medico-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent},

    { path: 'medicos', component: MedicosListComponent},
    { path: 'medicos/create', component: MedicoCreateComponent},
    { path: 'medicos/update/:id', component: MedicoUpdateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
