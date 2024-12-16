import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;
  
    if (!email || !email.endsWith('@duocuc.cl')) {
      this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
      return;
    }
  
    this.userService.login({ email, password })
      .then(response => {
        console.log('Login successful:', response);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        console.log('Correo guardado:', email);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log('Login failed:', error);
        this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
      });
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
