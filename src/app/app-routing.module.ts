import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule), ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'localizacion',
    loadChildren: () => import('./localizacion/localizacion.module').then( m => m.LocalizacionPageModule), ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule), ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./docente/docente.module').then( m => m.DocentePageModule)
  },
  {
    path: 'login-docente',
    loadChildren: () => import('./login-docente/login-docente.module').then( m => m.LoginDocentePageModule)
  },
  {
    path: 'docente-asignaturas',
    loadChildren: () => import('./docente-asignaturas/docente-asignaturas.module').then( m => m.DocenteAsignaturasPageModule)
  },
  {
    path: 'perfil-docente',
    loadChildren: () => import('./perfil-docente/perfil-docente.module').then( m => m.PerfilDocentePageModule)
  },
  {
    path: 'recu-doc',
    loadChildren: () => import('./recu-doc/recu-doc.module').then( m => m.RecuDocPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
