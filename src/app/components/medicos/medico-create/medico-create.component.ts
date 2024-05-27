import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Inputmask from 'inputmask';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models/medico';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrls: ['./medico-create.component.css']
})
export class MedicoCreateComponent implements OnInit {

  medico: Medico = {
    id: '',
    nome: '',
    crm: '',
    especialidade: '',
    email: '',
    telefone: ''
  }

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  crm: FormControl = new FormControl(null, Validators.required);
  especialidade: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  telefone: FormControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);


  constructor(
    private elementRef: ElementRef,
    private service: MedicosService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
      this.service.create(this.medico).subscribe(() => {
        this.toast.success('Médico cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['medicos'])
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
    return this.nome.valid && this.crm.valid && 
      this.especialidade.valid && this.email.valid && 
      this.telefone.valid
  }

  

}
