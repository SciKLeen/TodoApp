import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  appName = 'Todo App';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {}

  logOut() {
    this.authService.logout().subscribe(res => {
      if (res) {
        localStorage.removeItem('apiKey');
        this.router.navigate(['/login']);
      }
    }, () => {
      this.snackBar.open('Logout error', null, { duration: 2000, verticalPosition: 'top' });
    });
  }

  backToHome() {
    this.router.navigate(['/todo-list']);
  }
}
