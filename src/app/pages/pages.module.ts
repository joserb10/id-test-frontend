import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillaModule } from '../plantilla/plantilla.module';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { ComedoresComponent } from './comedores/comedores.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    PagesComponent,
    ComedoresComponent,
    DashboardComponent,
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    PlantillaModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
