import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

import { LoginComponent } from './components/login/login.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent,
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
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }