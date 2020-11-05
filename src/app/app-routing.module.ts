import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: TodoComponent,
    children: [
      { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
      { path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard] },
      { path: 'todo-list/:id', component: ListDetailComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
