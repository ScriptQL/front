import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'queries',
    component: MainLayoutComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/query/query.module').then(x => x.QueryModule)
  },
  {
    path: 'connections',
    component: MainLayoutComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/data-source/data-source.module').then(x => x.DataSourceModule)
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/users/users.module').then(x => x.UsersModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
