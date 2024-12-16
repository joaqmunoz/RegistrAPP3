import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuDocPage } from './recu-doc.page';

const routes: Routes = [
  {
    path: '',
    component: RecuDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuDocPageRoutingModule {}
