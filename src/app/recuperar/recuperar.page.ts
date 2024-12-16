import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserMenuComponent } from '../user-menu/user-menu.component'; 
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

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
      component: UserMenuComponent,
      event: event,
      translucent: true
    });
    await popover.present();
  }

}
