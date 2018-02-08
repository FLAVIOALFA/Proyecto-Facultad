import { RouterModule, Routes } from "@angular/router";

// ****************** Rutas completa con todos los componentes ******************
import { HomeComponent, UsuarioComponent , UsuarioDetailComponent,
  AlojamientoComponent } from './components/componentes.all';
// ****************** Fin Rutas completa con todos los componentes ******************

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'usuarioAlta', component: UsuarioComponent},
    { path: 'mi-cuenta', component: UsuarioDetailComponent},
    { path: '**', pathMatch: 'full',  redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
