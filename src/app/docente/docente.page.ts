import { Component } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import * as QRCode from 'qrcode';
import { Router } from '@angular/router';
import { DocenteMenuComponent } from '../docente-menu/docente-menu.component';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage {
  qrData: string = '';  
  qrCodeUrl: string = ''; 
  showQRCode: boolean = false;

  constructor(
    private alertController: AlertController,
    private popoverController: PopoverController,
    private router: Router
  ) {}

  async openMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: DocenteMenuComponent, 
      event: event,
      translucent: true
    });
    await popover.present();
  }

  generateQRCode() {
    this.qrData = 'Este es tu código QR';  

    QRCode.toDataURL(this.qrData)  
      .then((url: string) => {
        this.qrCodeUrl = url; 
        this.showQRCode = true;  
      })
      .catch((error: any) => {
        console.error('Error generando el QR', error);
      });
  }
  goToAsignaturas() {
    this.router.navigate(['/docente-asignaturas']);
  }
}
