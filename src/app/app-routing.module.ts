import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { TodoComponent } from './components/todo/todo.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: TodoComponent,
    children: [
      { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
      { path: 'todo-list', component: TodoListComponent },
      { path: 'todo-list/:id/:name', component: ListDetailComponent },
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
