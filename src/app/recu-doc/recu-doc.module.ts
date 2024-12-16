import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuDocPageRoutingModule } from './recu-doc-routing.module';

import { RecuDocPage } from './recu-doc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuDocPageRoutingModule
  ],
  declarations: [RecuDocPage]
})
export class RecuDocPageModule {}
