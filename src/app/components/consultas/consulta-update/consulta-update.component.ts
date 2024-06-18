import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.consulta.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllPacientes();
    this.findAllMedicos();
  }

  findById(): void {
    this.consultaService.findById(this.consulta.id).subscribe(resposta => {
      this.consulta = resposta;

      this.consulta.dataConsulta = this.convertDateForInput(this.consulta.dataConsulta);
      this.dataConsulta.setValue(this.consulta.dataConsulta);
      this.horaConsulta.setValue(this.consulta.horaConsulta);
      this.statusConsulta.setValue(this.consulta.statusConsulta.toString());
      this.medico.setValue(this.consulta.medico);
      this.paciente.setValue(this.consulta.paciente);

    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  update(): void {
    this.consulta.dataConsulta = this.formatDate(this.consulta.dataConsulta);

    this.consultaService.update(this.consulta).subscribe(resposta => {
      this.toastService.success('Consulta atualizada com sucesso!', 'Atualizar Consulta');
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

  convertDateForInput(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
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
