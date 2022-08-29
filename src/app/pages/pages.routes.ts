import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotesgroupComponent } from "./notesgroup/notesgroup.component";
import { PagesComponent } from "./pages.component";

const pages_routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'groups/:id', component: NotesgroupComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: '/login', pathMatch: 'full'},
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild(pages_routes);
