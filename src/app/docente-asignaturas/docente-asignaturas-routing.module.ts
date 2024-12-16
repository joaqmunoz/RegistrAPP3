import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteAsignaturasPage } from './docente-asignaturas.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteAsignaturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteAsignaturasPageRoutingModule {}
