import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DocenteMenuComponent } from '../docente-menu/docente-menu.component';

@Component({
  selector: 'app-perfil-docente',
  templateUrl: './perfil-docente.page.html',
  styleUrls: ['./perfil-docente.page.scss'],
})
export class PerfilDocentePage implements OnInit {

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
      component: DocenteMenuComponent,
      event: event,
      translucent: true
    });
    await popover.present();
  }

  goToRecuperar() {
    this.router.navigate(['/recuperar']);
  }

}
