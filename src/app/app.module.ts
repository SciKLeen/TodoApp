import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { TodoComponent } from './components/todo/todo.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent,
    ListDetailComponent,
    TodoComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [EditTaskComponent]
})
export class AppModule { }
