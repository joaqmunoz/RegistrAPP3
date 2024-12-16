import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteAsignaturasPageRoutingModule } from './docente-asignaturas-routing.module';

import { DocenteAsignaturasPage } from './docente-asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteAsignaturasPageRoutingModule
  ],
  declarations: [DocenteAsignaturasPage]
})
export class DocenteAsignaturasPageModule {}
