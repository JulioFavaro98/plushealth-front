import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-create',
  templateUrl: './consulta-create.component.html',
  styleUrls: ['./consulta-create.component.css']
})
export class ConsultaCreateComponent implements OnInit {

  dataConsulta: FormControl = new FormControl(null, [Validators.required])
  horaConsulta: FormControl = new FormControl(null, [Validators.required])
  statusConsulta: FormControl = new FormControl(null, [Validators.required])
  medico: FormControl = new FormControl(null, [Validators.required])
  paciente: FormControl = new FormControl(null, [Validators.required])

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return  this.dataConsulta.valid &&
            this.horaConsulta.valid &&
            this.statusConsulta.valid &&
            this.medico.valid && 
            this.paciente.valid;
  }

}
