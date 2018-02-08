import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { FormsModule }   from '@angular/forms';
import { HttpModule } from "@angular/http";

// ********************* Rutas *********************
import { APP_ROUTING } from './app.routes';
//******************* Fin Rutas *********************

// ********************* Servicios *********************
import{ AuthService } from "./services/auth.service";
import{ AuthGuardService } from "./services/auth-guard.service";
import { UsuarioService } from "./services/usuario/usuario.service";
import { RoleService} from "./services/role/role.service";
import { PaisService } from "./services/pais/pais.service";
import { ProvinciaService } from "./services/provincia/provincia.service";
import { LoginService } from "./services/login/login.service";
import { DomicilioService } from "./services/domicilio/domicilio.service";
// ******************* Fin Servicios *******************
// *********************** Componentes ***********************
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AlojamientoComponent } from './components/alojamiento/alojamiento.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UsuarioDetailComponent } from './components/usuario/usuario-detail.component';

// ********************* Fin Componentes *********************
@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AlojamientoComponent,
    HomeComponent,
    CarouselComponent,
    UsuarioDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [AuthService, AuthGuardService,
              UsuarioService, RoleService, PaisService,
             ProvinciaService, LoginService, DomicilioService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
