import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  formReg: FormGroup;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formReg = new FormGroup({
      rut: new FormControl(),
      nombres: new FormControl(),
      apellidos: new FormControl(),
      email: new FormControl(),
      password:new FormControl()
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log('Error al registrar:', error);

        if (error.message === 'Email already exists') {
          this.errorMessage = 'El correo electrónico ya está en uso. Por favor, usa otro.';
        } else {
          this.errorMessage = 'Hubo un error al registrarte. Por favor, ingresa credenciales validas.';
        }
      });
  }
  
  

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
