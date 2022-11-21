import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {FormService} from "../../services/form.service";
import {MessagingService} from "../../services/messaging.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    private forms: FormService,
    private _msg: MessagingService,
    private router: Router,
    private service: AuthService) {
    this.form = this.forms.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  singIn() {
    const user = this.form.value.user;
    const pswd = this.form.value.password;
    this.loading = true;
    this.service.login({
      email: user,
      password: pswd
    }).subscribe({
      next: (data) => {
        this.router.navigate(['queries']).finally();
      },
      error: (error) => {
        this.error(error.error.message);
        this.form.reset();
      }
    });
  }

  error(message: string) {
    this.loading = false;
    this._msg.error(message);
  }

}
