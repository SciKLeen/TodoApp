import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginTitle = 'Login';
  form: FormGroup;

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/todo-list']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(res => {
        localStorage.setItem('apiKey', res.apiKey);
        this.router.navigate(['/todo-list']);
      });
    }
  }
}
