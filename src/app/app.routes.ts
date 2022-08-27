import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const app_routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];

export const APP_ROUTES = RouterModule.forRoot(app_routes, {useHash: true});
