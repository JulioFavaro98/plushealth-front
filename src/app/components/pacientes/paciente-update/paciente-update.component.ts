import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Inputmask from 'inputmask';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.css']
})
export class PacienteUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.paciente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.paciente.id).subscribe(resposta => {
      this.paciente = resposta;
    });
  }

  update(): void {
      this.service.update(this.paciente).subscribe(() => {
        this.toast.success('Paciente atualizado com sucesso!', 'Update');
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
