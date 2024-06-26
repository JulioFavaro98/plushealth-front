import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    login: '',
    password: ''
  }

  login = new FormControl(null, Validators.minLength(3))
  senha = new FormControl(null, Validators.minLength(3))

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {

  }

  logar() {
    this.service.authenticate(this.creds).subscribe(
      resposta => {
        this.service.sucessfullLogin(resposta.headers.get('Authorization'));
        this.router.navigate(['']);
      }, () => {
        this.toast.error('Usuário e/ou senha inválidos!');
      }) 
  }

  validaCampos(): boolean {
    return this.login.valid && this.senha.valid
  }
}
