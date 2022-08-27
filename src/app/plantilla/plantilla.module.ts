import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PAGES_ROUTES } from '../pages/pages.routes';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    PAGES_ROUTES,
    CommonModule
  ]
})
export class PlantillaModule { }
