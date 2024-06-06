import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Inputmask from 'inputmask';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  paciente: Paciente = {
    id: '',
    nome: '',
    idade: '',
    sexo: '',
    email: '',
    telefone: ''
  }

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  idade: FormControl = new FormControl(null, Validators.required);
  sexo: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  telefone: FormControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);


  constructor(
    private elementRef: ElementRef,
    private service: PacientesService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
      this.service.create(this.paciente).subscribe(() => {
        this.toast.success('Paciente cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['pacientes'])
      }, ex => {
        if(ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      });
    }

  ngAfterViewInit(): void {
    Inputmask({ mask: '(99) 9999-9999' }).mask(this.elementRef.nativeElement.querySelector('#telefone'));
  }

  validarCampos(): boolean {
    return this.nome.valid && this.idade.valid && 
      this.sexo.valid && this.email.valid && 
      this.telefone.valid
  }

  

}
