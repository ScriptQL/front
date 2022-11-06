import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  },
  {
    path: 'queries',
    component: MainLayoutComponent,
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/query/query.module').then(x => x.QueryModule)
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
