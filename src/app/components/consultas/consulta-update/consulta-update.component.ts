import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from 'src/app/models/consulta';
import { Medico } from 'src/app/models/medico';
import { Paciente } from 'src/app/models/paciente';
import { ConsultaService } from 'src/app/services/consulta.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-consulta-update',
  templateUrl: './consulta-update.component.html',
  styleUrls: ['./consulta-update.component.css']
})
export class ConsultaUpdateComponent implements OnInit {

  consulta: Consulta = {
    dataConsulta: '',
    horaConsulta: '',
    statusConsulta: '',
    medico: null,
    paciente: null,
    nomeMedico: '',
    nomePaciente: ''
  }

  pacientes: Paciente[] = [];
  medicos : Medico[] = [];

  dataConsulta: FormControl = new FormControl(null, [Validators.required])
  horaConsulta: FormControl = new FormControl(null, [Validators.required])
  statusConsulta: FormControl = new FormControl(null, [Validators.required])
  medico: FormControl = new FormControl(null, [Validators.required])
  paciente: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private consultaService: ConsultaService,
    private medicoService: MedicosService,
    private pacienteService: PacientesService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllPacientes();
    this.findAllMedicos();
  }

  create(): void {
    this.consulta.dataConsulta = this.formatDate(this.consulta.dataConsulta);

    this.consultaService.create(this.consulta).subscribe(resposta => {
      this.toastService.success('Consulta agendada com sucesso!', 'Nova Consulta');
      this.router.navigate(['consultas']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllPacientes(): void {
    this.pacienteService.findAll().subscribe(resposta => {
      this.pacientes = resposta;
      this.pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
    })
  }

  findAllMedicos(): void {
    this.medicoService.findAll().subscribe(resposta => {
      this.medicos = resposta;
      this.medicos.sort((a, b) => a.nome.localeCompare(b.nome));
    })
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  validaCampos(): boolean {
    return  this.dataConsulta.valid && this.horaConsulta.valid &&
            this.statusConsulta.valid && this.medico.valid && 
            this.paciente.valid;
  }

}
