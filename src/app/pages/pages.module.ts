import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantillaModule } from '../plantilla/plantilla.module';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesgroupComponent } from './notesgroup/notesgroup.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NotesgroupComponent,
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
