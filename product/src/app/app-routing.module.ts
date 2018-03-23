import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ListComponent },
  { path: 'products/edit/:id', component: EditComponent },
  { path: 'products/new', component: CreateComponent },
  { path: '', pathMatch: 'full', redirectTo:'/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
