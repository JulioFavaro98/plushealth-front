import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MedicosListComponent } from './components/medicos/medicos-list/medicos-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MedicoCreateComponent } from './components/medicos/medico-create/medico-create.component';
import { MedicoUpdateComponent } from './components/medicos/medico-update/medico-update.component';
import { MedicoDeleteComponent } from './components/medicos/medico-delete/medico-delete.component';
import { PacientesListComponent } from './components/pacientes/pacientes-list/pacientes-list.component';
import { PacienteCreateComponent } from './components/pacientes/paciente-create/paciente-create.component';
import { PacienteUpdateComponent } from './components/pacientes/paciente-update/paciente-update.component';
import { PacienteDeleteComponent } from './components/pacientes/paciente-delete/paciente-delete.component';
import { ConsultasListComponent } from './components/consultas/consultas-list/consultas-list.component';
import { ConsultaCreateComponent } from './components/consultas/consulta-create/consulta-create.component';
import { ConsultaUpdateComponent } from './components/consultas/consulta-update/consulta-update.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent},

    { path: 'medicos',              component: MedicosListComponent},
    { path: 'medicos/create',       component: MedicoCreateComponent},
    { path: 'medicos/update/:id',   component: MedicoUpdateComponent},
    { path: 'medicos/delete/:id',   component: MedicoDeleteComponent},

    { path: 'pacientes',            component: PacientesListComponent},
    { path: 'pacientes/create',     component: PacienteCreateComponent},
    { path: 'pacientes/update/:id', component: PacienteUpdateComponent},
    { path: 'pacientes/delete/:id', component: PacienteDeleteComponent},

    {path: 'consultas',             component: ConsultasListComponent},
    {path: 'consultas/create',      component: ConsultaCreateComponent},
    {path: 'consultas/update/:id', component: ConsultaUpdateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
