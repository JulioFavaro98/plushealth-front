import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Inputmask from 'inputmask';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models/medico';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medico-delete',
  templateUrl: './medico-delete.component.html',
  styleUrls: ['./medico-delete.component.css']
})
export class MedicoDeleteComponent implements OnInit {

  medico: Medico = {
    id: '',
    nome: '',
    crm: '',
    especialidade: '',
    email: '',
    telefone: ''
  }


  constructor(
    private elementRef: ElementRef,
    private service: MedicosService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.medico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.medico.id).subscribe(resposta => {
      this.medico = resposta;
    });
  }

  delete(): void {
      this.service.delete(this.medico.id).subscribe(() => {
        this.toast.success('Médico excluído com sucesso!', 'Delete');
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




}
