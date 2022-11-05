import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  singIn() {
    const user = this.form.value.user;
    const pswd = this.form.value.password;

    if(user == 'adm' && pswd == 'adm') {
      this.loadingTime();

    } else {
      this.error();
      this.form.reset();
    }

  }

  error() {
    this._snackBar.open('User or password insert incorrectly','', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  loadingTime() {
    this.loading = true;
    setTimeout(() => { 
      this.router.navigate(['dashboard'])
    }, 1200)
  }

}
