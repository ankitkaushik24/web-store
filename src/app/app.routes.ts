import { Routes } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "./login/user.service";

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./login/login.component')
},
  {
    path: 'products',
    canMatch: [() => inject(UserService).isAdmin],
    loadComponent: () => import('./products-dashboard/products-dashboard.component')
  },
  {
    path: 'products',
    canMatch: [() => inject(UserService).isUser],
    loadComponent: () => import('./products-catalog/products-catalog.component')
  }
];
