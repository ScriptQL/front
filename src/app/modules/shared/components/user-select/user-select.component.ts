import { Page } from './../../../../interfaces/page';
import { Observable } from 'rxjs';
import { UserService } from './../../../../services/user.service';
import { User } from './../../../../interfaces/user';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {

  users$: Observable<Page<User>>;

  @Input()
  selected: User;

  @Output()
  onUpdated = new EventEmitter<User>();

  constructor(
    private service: UserService
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.service.search(1);
  }

  onUpdate($event: User) {
    this.onUpdated.emit($event);
  }

}
