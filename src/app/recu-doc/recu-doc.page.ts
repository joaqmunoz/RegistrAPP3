import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DocenteMenuComponent } from '../docente-menu/docente-menu.component';

@Component({
  selector: 'app-recu-doc',
  templateUrl: './recu-doc.page.html',
  styleUrls: ['./recu-doc.page.scss'],
})
export class RecuDocPage implements OnInit {

  public email:string="";

  constructor(
    private userService: UserService,
    private router: Router,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {
  }

  sendLinkReset(){

    if (this.email != "") {
      this.userService.resetPassword(this.email).then(()=>{
        console.log('enviado');
        }).catch(()=>{
        console.log('error');
      })

    } else {
      alert('El correo no es correcto, por favor intentelo nuevamente...')
    }

  }

  async openMenu(event: Event) {
    const popover = await this.popoverController.create({
      component: DocenteMenuComponent, 
      event: event,
      translucent: true
    });
    await popover.present();
  }

}