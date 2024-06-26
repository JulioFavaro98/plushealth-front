import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

//Componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MedicosListComponent } from './components/medicos/medicos-list/medicos-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { MedicoCreateComponent } from './components/medicos/medico-create/medico-create.component';
import { MedicoUpdateComponent } from './components/medicos/medico-update/medico-update.component';
import { MedicoDeleteComponent } from './components/medicos/medico-delete/medico-delete.component';
import { PacienteDeleteComponent } from './components/pacientes/paciente-delete/paciente-delete.component';
import { PacienteUpdateComponent } from './components/pacientes/paciente-update/paciente-update.component';
import { PacienteCreateComponent } from './components/pacientes/paciente-create/paciente-create.component';
import { PacientesListComponent } from './components/pacientes/pacientes-list/pacientes-list.component';
import { ConsultasListComponent } from './components/consultas/consultas-list/consultas-list.component';
import { ConsultaCreateComponent } from './components/consultas/consulta-create/consulta-create.component';
import { ConsultaUpdateComponent } from './components/consultas/consulta-update/consulta-update.component';
import { ConsultaReadComponent } from './components/consultas/consulta-read/consulta-read.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    MedicosListComponent,
    LoginComponent,
    MedicoCreateComponent,
    MedicoUpdateComponent,
    MedicoDeleteComponent,
    PacientesListComponent,
    PacienteCreateComponent,
    PacienteUpdateComponent,
    PacienteDeleteComponent,
    ConsultasListComponent,
    ConsultaCreateComponent,
    ConsultaUpdateComponent,
    ConsultaReadComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    })
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
