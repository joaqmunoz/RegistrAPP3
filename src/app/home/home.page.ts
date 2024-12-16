import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { QRScannerService } from '../services/qr-scanner.service'; 
import { AlertController, PopoverController } from '@ionic/angular'; 
import * as ZXing from '@zxing/library'; 
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private qrScannerService: QRScannerService, 
    private alertController: AlertController, 
    private popoverController: PopoverController, 
  ) {}

  async openMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: UserMenuComponent,
      event: event,
      translucent: true
    });
    await popover.present();
  }

  async showMessage() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: 'La aplicación ingresará a la cámara del dispositivo para capturar el código QR.',
    });
    await alert.present();
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });

      const imageUrl = image.webPath; 

      if (imageUrl) {
        const qrData = await this.processQRCode(imageUrl);
        console.log('QR Escaneado:', qrData);

        try {
          const parsedData = JSON.parse(qrData);
          const nombre = parsedData.nombre;
          const seccion = parsedData.seccion;
          const fecha = parsedData.fecha;

          if (nombre && seccion && fecha) {
            await this.qrScannerService.saveAttendance(nombre, seccion, fecha);
            console.log('Asistencia registrada correctamente');

            this.presentSuccessAlert(nombre, seccion, fecha);
          } else {
            this.showError('Datos inválidos del QR. Asegúrate de que todos los campos estén presentes.');
          }

        } catch (error) {
          console.error('Error al procesar los datos del QR:', error);
          this.showError('Hubo un problema al procesar los datos del QR.');
        }
      }

    } catch (error) {
      console.error('Error al capturar la imagen:', error);
      this.showError('Hubo un problema al capturar la imagen.');
    }
  }

  async processQRCode(imageUrl: string): Promise<string> {
    try {
      const codeReader = new ZXing.BrowserQRCodeReader();
      const imageElement = new Image();
      imageElement.src = imageUrl;

      return new Promise((resolve, reject) => {
        imageElement.onload = async () => {
          try {
            const result = await codeReader.decodeFromImage(imageElement);
            const qrContent = result.getText(); 
            resolve(qrContent); 
          } catch (error) {
            reject('No se pudo leer el QR');
          }
        };
        imageElement.onerror = () => reject('Error al cargar la imagen');
      });
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      throw error;
    }
  }

  async presentSuccessAlert(nombre: string, seccion: string, fecha: string) {
    const alert = await this.alertController.create({
      header: '¡Asistencia Registrada!',
      message: `La asistencia para la asignatura "${nombre}", sección ${seccion}, ha sido registrada exitosamente.`,
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
