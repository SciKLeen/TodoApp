import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      if (res) {
        localStorage.removeItem('apiKey');
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log('Logout error', error);
    });
  }

  backToHome() {
    this.router.navigate(['/todo-list']);
  }
}