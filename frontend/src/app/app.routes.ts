import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/cadastro/cadastro.component').then(
        (m) => m.CadastroComponent
      ),
  },
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full',
  },
];
