import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;

  groups: any[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'reviewer', viewValue: 'Reviewer'},
    {value: 'dev', viewValue: 'Dev'},
  ];

  constructor(private fb: FormBuilder,
    private _userService: UserService,
    private router: Router) {
      this.form = this.fb.group({
        userName: ['', Validators.required],
        userEmail: ['', Validators.required],
        userGroup: ['', Validators.required],
      })
   }

  ngOnInit(): void {
  }

  createUser() {
    const user: User = {
      id: '1',
      name: this.form.value.userName,
      email: this.form.value.userEmail,
      group: this.form.value.userGroup,
      status: 'active'
    }

    this._userService.createUser(user);
    this.router.navigate(['/dashboard'])
  }

}
