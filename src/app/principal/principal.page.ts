import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {
  isActionSheetOpen = false;


  constructor(private router: Router) {}

  actionSheetButtons = [
    {
      text: 'Estudiante',
      cssClass: 'action-sheet-button',
      handler: () => {
        this.navigateTo('/login');
      },
    },
    {
      text: 'Docente',
      cssClass: 'action-sheet-button',
      handler: () => {
        this.navigateTo('/login-docente');
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'action-sheet-cancel-button',
    },
  ];

  openMenu() {
    this.isActionSheetOpen = true;
  }

  navigateTo(path: string) {
    this.isActionSheetOpen = false; 
    this.router.navigate([path]); 
  }
}