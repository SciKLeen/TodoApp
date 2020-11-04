import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
