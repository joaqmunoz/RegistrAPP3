import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage {
  formLogin: FormGroup;
  errorMessage: string = '';

  constructor(private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), 
      password: new FormControl('', [Validators.required, Validators.minLength(6)]), 
    });
  }

  onSubmit() {
    const { email, password } = this.formLogin.value;

    if (this.isValidProfesorEmail(email)) {
      console.log('Autenticando...', email, password);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      this.router.navigate(['/docente']);
    } else {
      this.errorMessage = 'El correo ingresado no es válido, inténtelo otra vez.';
      console.log('Correo inválido');
    }
  }

  isValidProfesorEmail(email: string): boolean {
    return email.endsWith('@profesor.duoc.cl');
  }

  goToRegister() {
    this.router.navigate(['/registrar']);
  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }

  goToBack() {
    this.router.navigate(['/principal']);
  }
}
