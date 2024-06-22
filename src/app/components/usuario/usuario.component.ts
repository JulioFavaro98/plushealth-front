import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  formData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  submitForm(): void {
    if (this.formData.newPassword !== this.formData.confirmPassword) {
      this.toastr.error('As senhas nova e de confirmação não correspondem.', 'Erro');
      return;
    }

    this.authService.changePassword(this.formData.oldPassword, this.formData.newPassword).subscribe(
      () => {
        this.router.navigate(['login']);
        this.authService.logout();
        this.toastr.success('Senha alterada com sucesso!', 'Alteração de Senha');
      },
      error => {
        if (error.status === 403) {
          this.toastr.error('Senha atual incorreta.', 'Erro');
        } else {
          this.toastr.error('Erro ao alterar a senha: ' + error.error.message, 'Erro');
        }
      }
    );
  }

}
