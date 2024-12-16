import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
  constructor(
    private popoverController: PopoverController,
    private userService: UserService,
    private router: Router
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
      .catch(error => console.log(error));
  }

  goToPerfil() {
    this.closePopoverAndNavigate('/perfil'); 
  }

  goToRestablecer() {
    this.closePopoverAndNavigate('/recuperar');
  }

  goToHistorial() {
    this.closePopoverAndNavigate('/historial');
  }

  goToHome() {
    this.closePopoverAndNavigate('/home'); 
  }
}
