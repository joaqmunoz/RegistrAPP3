import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserMenuComponent } from '../user-menu/user-menu.component'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  email: string | null = '';
  password: string | null = ''; 

  constructor(
    private popoverController: PopoverController,
    private router: Router
  ) { } 

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
    this.password = localStorage.getItem('nombre');
  }

  async openMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: UserMenuComponent,
      event: event,
      translucent: true
    });
    await popover.present();
  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }

}
