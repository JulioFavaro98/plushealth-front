import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    login: '',
    senha: ''
  }

  login = new FormControl(null, Validators.minLength(3))
  senha = new FormControl(null, Validators.minLength(3))

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    if(this.login.valid && this.senha.valid){
      return true;
    } else {
      return false;
    }
  }

}
