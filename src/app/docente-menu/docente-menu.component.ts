import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-docente-menu',
  templateUrl: './docente-menu.component.html',
})
export class DocenteMenuComponent {
  constructor(
    private popoverController: PopoverController,
    private router: Router,
    private userService: UserService
  ) {}

  async closePopoverAndNavigate(path: string) {
    await this.popoverController.dismiss();
    this.router.navigate([path]);
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/principal']);
      })
      .catch((error) => console.log(error));
  }

  goToDocente() {
    this.closePopoverAndNavigate('/docente');
  }

  goToDocenteAsignaturas() {
    this.closePopoverAndNavigate('/docente-asignaturas');
  }

  goToPerfilDocente() {
    this.closePopoverAndNavigate('/perfil-docente');
  }

  goToRecuperarDocente() {
    this.closePopoverAndNavigate('/recu-doc');
  }
}
